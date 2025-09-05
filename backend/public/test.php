<?php
echo "Hello from DigitalOcean!";
echo "<br>PHP Version: " . phpversion();
echo "<br>Server Time: " . date('Y-m-d H:i:s');
echo "<br>Port: " . ($_SERVER['SERVER_PORT'] ?? 'unknown');
phpinfo();
?>
