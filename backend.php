<?php
header('Access-Control-Allow-Origin: *');

// Establish a connection to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "card_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'add') {
        // Add item to the cart
        $name = $_POST['name'];
        $price = floatval($_POST['price']);
        $quantity = $_POST['quantity'];
        $total = floatval($_POST['total']);
        $id = $_POST['id'];

        // Insert the item into the database
        $sql = "INSERT INTO cart_items (name, price, quantity, total) VALUES ('$name', '$price', '$quantity', '$total')";
        if ($conn->query($sql) === TRUE) {
            echo 'Item added successfully';
        } else {
            echo 'Error adding item: ' . $conn->error;
        }
    } elseif ($action === 'remove') {
        // Remove item from the cart
        $name = $_POST['name'];

        // Delete the item from the database
        $sql = "DELETE FROM cart_items WHERE name = '$name'";
        if ($conn->query($sql) === TRUE) {
            echo 'Item removed successfully';
        } else {
            echo 'Error removing item: ' . $conn->error;
        }
    } elseif ($action === 'update') {
        // Update item quantity in the cart
        $name = $_POST['name'];
        $quantity = $_POST['quantity'];

        // Update the item quantity in the database
        $sql = "UPDATE cart_items SET quantity = '$quantity' WHERE name = '$name'";
        if ($conn->query($sql) === TRUE) {
            echo 'Item quantity updated successfully';
        } else {
            echo 'Error updating item quantity: ' . $conn->error;
        }
    }
}

// Close the database connection
$conn->close();
?>
