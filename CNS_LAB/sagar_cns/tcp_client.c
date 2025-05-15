#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define MAX 25

int main() {
    // Declare Variables
    int client_sockfd;
    char command[MAX], response[MAX];
    struct sockaddr_in server_addr;
    int client_len, result;

    // Create socket at client side
    client_sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (client_sockfd == -1) {
        perror("Socket creation failed");
        return 1;
    }

    // Initialize server_addr structure
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    server_addr.sin_port = 9734;
    client_len = sizeof(server_addr);

    // Connect to server
    result = connect(client_sockfd, (struct sockaddr*)&server_addr, client_len);
    if (result == -1) {
        perror("Unable to connect to server");
        return 1;
    }

    printf("Connected to server.\n");

    // Communication with server
    while (1) {
        printf("Client write: ");
        scanf("%s", command);

        // Send command to server
        if (write(client_sockfd, command, MAX) == -1) {
            perror("Write failed");
            break;
        }

        // Read server response
        if (read(client_sockfd, response, MAX) == -1) {
            perror("Read failed");
            break;
        }
        
        printf("Client read: %s\n", response);
    }

    // Close client socket
    close(client_sockfd);
    return 0;
}












