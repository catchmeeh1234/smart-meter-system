<?php

    // Create WebSocket server
    $server = new WebSocketServer("0.0.0.0", 8080);

    // On client connection, send a welcome message
    $server->on('connection', function ($client) {
        $client->send('Welcome to the WebSocket server!');
    });

    // On message received from client, send it back to all connected clients
    $server->on('message', function ($client, $message) use ($server) {
        foreach ($server->getClients() as $c) {
            $c->send($message);
        }
    });

    // Start the server
    $server->run();