#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define MAX 25
#define PORT 9734

int main() {
    int client_sockfd;
    char command[MAX], response[MAX];
    struct sockaddr_in server_addr;
    socklen_t client_len;
    int result;

    // 1. Create socket at client side
    client_sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (client_sockfd == -1) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    // 2. Initialize structure
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    
    // Convert IP address from text to binary
    if (inet_pton(AF_INET, "127.0.0.1", &server_addr.sin_addr) <= 0) {
        perror("Invalid address/ Address not supported");
        exit(EXIT_FAILURE);
    }

    client_len = sizeof(server_addr);

    // 3. Connect to server
    result = connect(client_sockfd, (struct sockaddr*)&server_addr, client_len);
    if (result == -1) {
        perror("Cannot connect");
        close(client_sockfd);
        return 1;
    }

    printf("Connected to server...\n");

    while (1) {
        // Client writes command
        printf("Client write: ");
        scanf("%s", command);

        // Send data to server
        write(client_sockfd, command, strlen(command));

        // Read server response
        memset(response, 0, MAX);
        int bytes_read = read(client_sockfd, response, MAX - 1);
        if (bytes_read <= 0) {
            printf("Server disconnected.\n");
            break;
        }

        response[bytes_read] = '\0';  // Null-terminate response
        printf("Client read: %s\n", response);
    }

    close(client_sockfd);
    return 0;
}

