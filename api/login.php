<?php
require_once '../config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Get input data
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Validate input
if (!isset($data['username']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$username = trim($data['username']);
$password = $data['password'];

try {
    $conn = getDBConnection();
    
    // Find user
    $stmt = $conn->prepare("SELECT id, username, email, password_hash FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['error' => 'Invalid username or password']);
        exit;
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password
    if (password_verify($password, $user['password_hash'])) {
        // Generate session token (simplified for demo)
        $token = bin2hex(random_bytes(32));
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email']
            ],
            'token' => $token
        ]);
    } else {
        echo json_encode(['error' => 'Invalid username or password']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
