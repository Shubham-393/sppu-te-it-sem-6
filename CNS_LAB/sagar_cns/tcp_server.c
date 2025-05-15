#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define MAX 25

int main() {
    // Declare Variables
    int server_sockfd, client_sockfd;
    char command[MAX], response[MAX];
    struct sockaddr_in server_addr, client_addr;
    int server_len, client_len;

    // Create socket at server side
    server_sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_sockfd == -1) {
        perror("Socket creation failed");
        return 1;
    }

    // Initialize server_addr structure
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    server_addr.sin_port = 9734;
    server_len = sizeof(server_addr);

    // Binding server information to its own socket
    if (bind(server_sockfd, (struct sockaddr*)&server_addr, server_len) == -1) {
        perror("Binding failed");
        return 1;
    }

    // Listening on server socket for multiple clients
    if (listen(server_sockfd, 5) == -1) {
        perror("Listen failed");
        return 1;
    }

    printf("Server is listening for client connections...\n");

    // Accept client connections and process commands
    while (1) {
        client_len = sizeof(client_addr);

        // Accept connection from client
        client_sockfd = accept(server_sockfd, (struct sockaddr*)&client_addr, &client_len);
        if (client_sockfd == -1) {
            perror("Client connection failed");
            continue;
        }

        printf("Client connected.\n");

        // Communication with client
        while (1) {
            // Read data from client
            if (read(client_sockfd, command, MAX) == -1) {
                perror("Read failed");
                break;
            }
            
            // Null-terminate the command
            command[strlen(command)] = '\0';
            printf("\nServer read: %s\n", command);

            // Server sends response to client
            printf("Server write: ");
            scanf("%s", response);
            if (write(client_sockfd, response, MAX) == -1) {
                perror("Write failed");
                break;
            }
        }

        // Close client socket
        close(client_sockfd);
        printf("Client disconnected.\n");
    }

    // Close server socket
    close(server_sockfd);
    return 0;
}


/*
gcc tcp_server.c -o tcp_server
gcc tcp_client.c -o tcp_client 
./tcp_server 
*/

/*  
./tcp_client
*/





