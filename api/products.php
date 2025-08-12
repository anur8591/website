<?php
require_once '../config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$conn = getDBConnection();

// Handle GET request - Get all products
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $sql = "SELECT id, name, price, description, image_url, stock, category FROM products ORDER BY created_at DESC";
        $result = $conn->query($sql);
        
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'products' => $products,
            'count' => count($products)
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch products']);
    }
}

// Handle POST request - Add new product (admin functionality)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['name']) || !isset($data['price']) || !isset($data['description'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
    
    $name = $data['name'];
    $price = floatval($data['price']);
    $description = $data['description'];
    $image_url = $data['image_url'] ?? '';
    $stock = intval($data['stock'] ?? 0);
    $category = $data['category'] ?? 'General';
    
    try {
        $stmt = $conn->prepare("INSERT INTO products (name, price, description, image_url, stock, category) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sdssis", $name, $price, $description, $image_url, $stock, $category);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Product added successfully',
                'product_id' => $conn->insert_id
            ]);
        } else {
            echo json_encode(['error' => 'Failed to add product']);
        }
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error']);
    }
}
?>
