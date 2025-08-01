const axios = require('axios');

const BASE_URL = 'http://172.20.10.11:8000/api';

async function testFrontendImage() {
    try {
        console.log('🧪 Testing Frontend-Style Image Upload...\n');

        // This simulates what the frontend might be sending - a smaller base64 image
        const frontendImageBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A';

        // Check the size
        const base64Data = frontendImageBase64.replace('data:image/jpeg;base64,', '');
        const decodedImage = Buffer.from(base64Data, 'base64');
        console.log('Frontend image base64 length:', frontendImageBase64.length);
        console.log('Frontend decoded image size:', decodedImage.length, 'bytes');
        console.log('Would pass 1KB validation:', decodedImage.length > 1000);

        const formData = new FormData();
        formData.append('first_name', 'Test');
        formData.append('surname', 'Doctor');
        formData.append('email', `test.doctor.${Date.now()}@example.com`);
        formData.append('password', 'password123');
        formData.append('password_confirmation', 'password123');
        formData.append('dob', '1990-01-01');
        formData.append('gender', 'male');
        formData.append('country', 'Test Country');
        formData.append('city', 'Test City');
        formData.append('user_type', 'doctor');
        formData.append('specialization', 'Cardiology');
        formData.append('sub_specialization', 'Interventional Cardiology');
        formData.append('years_of_experience', '5');
        formData.append('bio', 'Experienced cardiologist with expertise in interventional procedures.');
        formData.append('profile_picture', frontendImageBase64);
        formData.append('national_id', frontendImageBase64);
        formData.append('medical_degree', frontendImageBase64);
        formData.append('medical_licence', frontendImageBase64);

        console.log('\n1. Making registration request...');
        const response = await axios.post(`${BASE_URL}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
            timeout: 30000
        });

        console.log('✅ Registration successful!');
        console.log('Status:', response.status);
        console.log('Response data:', {
            success: response.data.success,
            message: response.data.message,
            user: {
                id: response.data.data.user.id,
                email: response.data.data.user.email,
                user_type: response.data.data.user.user_type,
                status: response.data.data.user.status,
                specialization: response.data.data.user.specialization,
                hasProfilePicture: !!response.data.data.user.profile_picture,
                hasDocuments: {
                    national_id: !!response.data.data.user.national_id,
                    medical_degree: !!response.data.data.user.medical_degree,
                    medical_licence: !!response.data.data.user.medical_licence
                }
            },
            hasToken: !!response.data.data.token
        });

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        
        if (error.response?.status === 422) {
            console.log('\nValidation errors:');
            console.log(JSON.stringify(error.response.data.errors, null, 2));
        }
    }
}

testFrontendImage(); 