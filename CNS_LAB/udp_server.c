#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define MAX 80
#define PORT 9734

int main() {
    int server_sockfd;
    char buffer[MAX], response[MAX];
    struct sockaddr_in server_addr, client_addr;
    socklen_t client_len = sizeof(client_addr);

    // 1. Create UDP socket
    server_sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (server_sockfd == -1) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    // 2. Initialize server address structure
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    server_addr.sin_addr.s_addr = INADDR_ANY;

    // 3. Bind the socket
    if (bind(server_sockfd, (struct sockaddr*)&server_addr, sizeof(server_addr)) == -1) {
        perror("Bind failed");
        close(server_sockfd);
        exit(EXIT_FAILURE);
    }

    printf("UDP Server listening on port %d...\n", PORT);

    while (1) {
        memset(buffer, 0, MAX);

        // 4. Receive data from client
        int bytes_received = recvfrom(server_sockfd, buffer, MAX - 1, 0, 
                                      (struct sockaddr*)&client_addr, &client_len);
        if (bytes_received < 0) {
            perror("Receive failed");
            continue;
        }

        buffer[bytes_received] = '\0'; // Null-terminate string
        printf("\nServer received: %s", buffer);

        printf("\nServer response: ");
        scanf("%s", response);

        // 5. Send response back to client
        sendto(server_sockfd, response, strlen(response), 0, 
               (struct sockaddr*)&client_addr, client_len);
    }

    close(server_sockfd);
    return 0;
}