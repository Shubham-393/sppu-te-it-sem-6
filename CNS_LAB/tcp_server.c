#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define MAX 80
#define PORT 9734

int main() {
    int server_sockfd, client_sockfd;
    char command[MAX], response[MAX];
    struct sockaddr_in server_addr, client_addr;
    socklen_t client_len;

    // 1. Create socket
    server_sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_sockfd == -1) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    // 2. Initialize server address structure
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    if (inet_pton(AF_INET, "127.0.0.1", &server_addr.sin_addr) <= 0) {
        perror("Invalid address");
        exit(EXIT_FAILURE);
    }

    // 3. Bind the socket
    if (bind(server_sockfd, (struct sockaddr*)&server_addr, sizeof(server_addr)) == -1) {
        perror("Bind failed");
        close(server_sockfd);
        exit(EXIT_FAILURE);
    }

    // 4. Listen for incoming connections
    if (listen(server_sockfd, 5) == -1) {
        perror("Listen failed");
        close(server_sockfd);
        exit(EXIT_FAILURE);
    }

    printf("Server listening on port %d...\n", PORT);

    while (1) {
        client_len = sizeof(client_addr);

        // 5. Accept client connection
        client_sockfd = accept(server_sockfd, (struct sockaddr*)&client_addr, &client_len);
        if (client_sockfd == -1) {
            perror("Accept failed");
            continue;
        }

        printf("Client connected!\n");

        while (1) {
            memset(command, 0, MAX);
            int bytes_read = read(client_sockfd, command, MAX - 1);
            if (bytes_read <= 0) {
                printf("Client disconnected.\n");
                break;
            }

            command[bytes_read] = '\0'; // Null-terminate string
            printf("\nServer received: %s", command);

            printf("\nServer response: ");
            scanf("%s", response);

            write(client_sockfd, response, strlen(response));
        }

        close(client_sockfd);
    }

    close(server_sockfd);
    return 0;
}

