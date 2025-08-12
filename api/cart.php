<?php
require_once '../config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$conn = getDBConnection();

// Get user ID from request (in real app, this would come from JWT token)
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

if ($user_id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid user ID']);
    exit;
}

// Handle GET request - Get user's cart
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $sql = "SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.image_url 
                FROM cart c 
                JOIN products p ON c.product_id = p.id 
                WHERE c.user_id = ? 
                ORDER BY c.added_at DESC";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $cart = [];
        $total = 0;
        
        while ($row = $result->fetch_assoc()) {
            $row['subtotal'] = $row['price'] * $row['quantity'];
            $total += $row['subtotal'];
            $cart[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'cart' => $cart,
            'total' => $total,
            'count' => count($cart)
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch cart']);
    }
}

// Handle POST request - Add item to cart
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['product_id']) || !isset($data['quantity'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
    
    $product_id = intval($data['product_id']);
    $quantity = intval($data['quantity']);
    
    if ($quantity <= 0) {
        echo json_encode(['error' => 'Quantity must be greater than 0']);
        exit;
<create_file>
<path>api/cart.php</path>
<content>
<?php
require_once '../config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$conn = getDBConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get cart items for a user
        if (!isset($_GET['user_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing user_id']);
            exit;
        }
        $user_id = intval($_GET['user_id']);
        $sql = "SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.image_url 
                FROM cart c 
                JOIN products p ON c.product_id = p.id 
                WHERE c.user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $cart_items = [];
        while ($row = $result->fetch_assoc()) {
            $cart_items[] = $row;
        }
        echo json_encode(['success' => true, 'cart' => $cart_items]);
        break;

    case 'POST':
        // Add or update cart item
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['user_id']) || !isset($data['product_id']) || !isset($data['quantity'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        $user_id = intval($data['user_id']);
        $product_id = intval($data['product_id']);
        $quantity = intval($data['quantity']);

        // Check if item already in cart
        $stmt = $conn->prepare("SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?");
        $stmt->bind_param("ii", $user_id, $product_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Update quantity
            $row = $result->fetch_assoc();
            $new_quantity = $row['quantity'] + $quantity;
            $update_stmt = $conn->prepare("UPDATE cart SET quantity = ? WHERE id = ?");
            $update_stmt->bind_param("ii", $new_quantity, $row['id']);
            if ($update_stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Cart updated']);
            } else {
                echo json_encode(['error' => 'Failed to update cart']);
            }
        } else {
            // Insert new item
            $insert_stmt = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)");
            $insert_stmt->bind_param("iii", $user_id, $product_id, $quantity);
            if ($insert_stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Item added to cart']);
            } else {
                echo json_encode(['error' => 'Failed to add to cart']);
            }
        }
        break;

    case 'DELETE':
        // Remove item from cart
        parse_str(file_get_contents("php://input"), $delete_vars);
        if (!isset($delete_vars['cart_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing cart_id']);
            exit;
        }
        $cart_id = intval($delete_vars['cart_id']);
        $stmt = $conn->prepare("DELETE FROM cart WHERE id = ?");
        $stmt->bind_param("i", $cart_id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Item removed from cart']);
        } else {
            echo json_encode(['error' => 'Failed to remove item']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
