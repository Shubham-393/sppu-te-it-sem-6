#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define MAX 80
#define PORT 9734

int main() {
    int client_sockfd;
    char command[MAX], response[MAX];
    struct sockaddr_in server_addr;
    socklen_t server_len = sizeof(server_addr);

    // 1. Create UDP socket
    client_sockfd = socket(AF_INET, SOCK_DGRAM, 0);
    if (client_sockfd == -1) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    // 2. Initialize server address structure
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");

    while (1) {
        // Client writes command
        printf("Client write: ");
        scanf("%s", command);

        // 3. Send data to server
        sendto(client_sockfd, command, strlen(command), 0, 
               (struct sockaddr*)&server_addr, server_len);

        // 4. Receive server response
        memset(response, 0, MAX);
        int bytes_received = recvfrom(client_sockfd, response, MAX - 1, 0, 
                                      (struct sockaddr*)&server_addr, &server_len);
        if (bytes_received < 0) {
            perror("Receive failed");
            break;
        }

        response[bytes_received] = '\0'; // Null-terminate response
        printf("Client read: %s\n", response);
    }

    close(client_sockfd);
    return 0;
}