import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const maxWidth = isWeb ? 800 : width;
const isLargeScreen = width > 768;

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    {
        question: "How do I accept or reject appointment requests?",
        answer: "Go to the Appointments tab to view pending requests. Tap Accept or Reject for each request.",
        category: "Appointments"
    },
    {
        question: "How do I view my earnings and withdraw funds?",
        answer: "Go to the Profile tab and check the Earnings card. Tap Withdraw to request a payout.",
        category: "Earnings"
    },
    {
        question: "How do I communicate with patients?",
        answer: "Use the Messages tab to chat with patients whose appointments you have accepted.",
        category: "Communication"
    },
    {
        question: "How do I update my profile or availability?",
        answer: "Go to Profile > Edit Profile to update your information and available hours.",
        category: "Profile"
    },
    {
        question: "How do I ensure patient data privacy?",
        answer: "Always use the platform for communication and never share patient data outside the app. We are HIPAA compliant.",
        category: "Compliance"
    },
    {
        question: "How do I get support or report an issue?",
        answer: "Tap the Contact Support button below to email, call, or WhatsApp our support team.",
        category: "Support"
    },
    {
        question: "How do I reset my password?",
        answer: "On the login screen, tap 'Forgot Password' and follow the instructions sent to your email.",
        category: "Account"
    }
];

export default function HelpSupport() {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    const categories = ['All', 'Appointments', 'Subscriptions', 'Communication', 'Payments', 'Profile', 'Account', 'Privacy'];

    const filteredFAQs = faqData.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || selectedCategory === 'All' || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleContactSupport = () => {
        Alert.alert(
            'Contact Support',
            'Choose how you would like to contact us:',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Email Support', 
                    onPress: () => Linking.openURL('mailto:support@docavailable.com?subject=Support Request')
                },
                { 
                    text: 'Call Support', 
                    onPress: () => Linking.openURL('tel:+265123456789')
                },
                { 
                    text: 'WhatsApp', 
                    onPress: () => Linking.openURL('https://wa.me/265123456789?text=Hello, I need support with DocAvailable')
                }
            ]
        );
    };

    const handleEmergencyContact = () => {
        Alert.alert(
            'Emergency Contact',
            'For medical emergencies, please contact emergency services immediately:',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Emergency Services', 
                    onPress: () => Linking.openURL('tel:998'),
                    style: 'destructive'
                },
                { 
                    text: 'Ambulance', 
                    onPress: () => Linking.openURL('tel:997'),
                    style: 'destructive'
                }
            ]
        );
    };

    const renderFAQItem = (faq: FAQItem, index: number) => (
        <TouchableOpacity
            key={index}
            style={styles.faqItem}
            onPress={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
        >
            <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                                        <Text style={{ fontSize: 16, color: "#666" }}>⬇️</Text>
            </View>
            {expandedFAQ === index && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={{ fontSize: 20, color: "#4CAF50" }}>⬅️</Text>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Help & Support</Text>
                    <View style={{ width: 60 }} />
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Text style={{ fontSize: 16, color: "#999" }}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for help topics..."
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                                <Text style={{ fontSize: 16, color: "#999" }}>❌</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Category Filter */}
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoryContainer}
                        contentContainerStyle={styles.categoryContent}
                    >
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === category && styles.categoryButtonActive
                                ]}
                                onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    selectedCategory === category && styles.categoryTextActive
                                ]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Quick Actions */}
                    <View style={styles.quickActionsSection}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                        <View style={styles.quickActionsGrid}>
                            <TouchableOpacity style={styles.quickActionCard} onPress={handleContactSupport}>
                                <View style={styles.quickActionIcon}>
                                    <Text style={{ fontSize: 24, color: "#4CAF50" }}>📞</Text>
                                </View>
                                <Text style={styles.quickActionTitle}>Contact Support</Text>
                                <Text style={styles.quickActionSubtitle}>Get help from our team</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.quickActionCard} onPress={handleEmergencyContact}>
                                <View style={[styles.quickActionIcon, { backgroundColor: '#FFF5F5' }]}>
                                    <Text style={{ fontSize: 24, color: "#F44336" }}>⚠️</Text>
                                </View>
                                <Text style={styles.quickActionTitle}>Emergency</Text>
                                <Text style={styles.quickActionSubtitle}>Emergency services</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.quickActionCard}
                                onPress={() => Linking.openURL('https://docavailable.com/terms')}
                            >
                                <View style={[styles.quickActionIcon, { backgroundColor: '#F0F8FF' }]}>
                                    <Text style={{ fontSize: 24, color: "#2196F3" }}>📄</Text>
                                </View>
                                <Text style={styles.quickActionTitle}>Terms of Service</Text>
                                <Text style={styles.quickActionSubtitle}>Read our terms</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.quickActionCard}
                                onPress={() => Linking.openURL('https://docavailable.com/privacy')}
                            >
                                <View style={[styles.quickActionIcon, { backgroundColor: '#F0FFF0' }]}>
                                    <Text style={{ fontSize: 24, color: "#4CAF50" }}>🛡️</Text>
                                </View>
                                <Text style={styles.quickActionTitle}>Privacy Policy</Text>
                                <Text style={styles.quickActionSubtitle}>Data protection</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* FAQ Section */}
                    <View style={styles.faqSection}>
                        <Text style={styles.sectionTitle}>
                            Frequently Asked Questions
                            {filteredFAQs.length > 0 && ` (${filteredFAQs.length})`}
                        </Text>
                        
                        {filteredFAQs.length === 0 ? (
                            <View style={styles.emptyState}>
                                <Text style={{ fontSize: 48, color: "#CCC" }}>🔍</Text>
                                <Text style={styles.emptyStateTitle}>No results found</Text>
                                <Text style={styles.emptyStateSubtitle}>
                                    Try searching with different keywords or browse all categories
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.faqList}>
                                {filteredFAQs.map((faq, index) => renderFAQItem(faq, index))}
                            </View>
                        )}
                    </View>

                    {/* Contact Information */}
                    <View style={styles.contactSection}>
                        <Text style={styles.sectionTitle}>Still Need Help?</Text>
                        <View style={styles.contactCard}>
                            <View style={styles.contactInfo}>
                                <Text style={{ fontSize: 20, color: "#4CAF50" }}>📧</Text>
                                <Text style={styles.contactText}>support@docavailable.com</Text>
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={{ fontSize: 20, color: "#4CAF50" }}>📞</Text>
                                <Text style={styles.contactText}>+265 123 456 789</Text>
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={{ fontSize: 20, color: "#4CAF50" }}>⏰</Text>
                                <Text style={styles.contactText}>24/7 Support Available</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    mainContent: {
        flex: 1,
        maxWidth: maxWidth,
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 16,
        color: '#4CAF50',
        marginLeft: 8,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    clearButton: {
        padding: 4,
    },
    categoryContainer: {
        marginBottom: 24,
    },
    categoryContent: {
        paddingHorizontal: 4,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    categoryButtonActive: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    categoryText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    categoryTextActive: {
        color: '#FFFFFF',
    },
    quickActionsSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: isLargeScreen ? 22 : 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quickActionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        width: '48%',
    },
    quickActionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F0F8FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    quickActionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    quickActionSubtitle: {
        fontSize: 14,
        color: '#666',
        lineHeight: 18,
    },
    faqSection: {
        marginBottom: 32,
    },
    faqList: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    faqItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        flex: 1,
        marginRight: 12,
        lineHeight: 22,
    },
    faqAnswer: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 20,
    },
    contactSection: {
        marginBottom: 32,
    },
    contactCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    contactText: {
        fontSize: 16,
        color: '#000',
        marginLeft: 12,
        fontWeight: '500',
    },
}); 