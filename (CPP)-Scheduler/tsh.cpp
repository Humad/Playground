#include "tsh.h"

using namespace std;

void simple_shell::parse_command(char* cmd, char** cmdTokens) {
  // TODO: tokenize the command string into arguments
  char *cmdCopy = strdup(cmd);
  char *token = strtok(cmdCopy, " \n");

  int count = 0;

  while (token != NULL) {
      count = count + 1;
      token = strtok(NULL, " \n");
  }

  cmdCopy = strdup(cmd);
  token = strtok(cmdCopy, " \n");
  *cmdTokens = new char[count];
  count = 0;

  while (token != NULL) {
      cmdTokens[count] = token;
      token = strtok(NULL, " \n");
      count = count + 1;
  }
}

void simple_shell::exec_command(char **argv){
  // TODO: fork a child process to execute the command.
  // parent process should wait for the child process to complete and reap it
  int rc = fork();
  if (rc < 0) {
      exit(1);
  } else if (rc == 0) { // child process
      char *processName = argv[0];
      char *argument1 = argv[1];
      execvp(processName, argv);
  } else {
      wait(NULL);
  }
}

bool simple_shell::isQuit(char *cmd){
  // TODO: check for the command "quit" that terminates the shell
  return strcmp(cmd, "quit") == 0;
}
