# Azure Functions by using VS Code
## Prerequisites
* Acvite Azure subscription
* VS Code with extensions : "Java extension pack" and "Auzre Functions extension" or "Azure Tools".
* In VS Code, select F1 => Azure Functions: Install or Update Core Tools to install or update Core Tools
* Make sure to append the environment variable "Path" with the location of globally installed core tools (npm library). Ex: Path=%path%;C:\Users\<user home dir>\AppData\Roaming\npm. Note: Check the value of variable %AppData% to get the base location.
* set the windows environment variables "JAVA_HOME", "M2_HOME", "MAVEN_OPTS" as needed
## run the function locally
* Press F5 to run the function in debug mode.
* Call the function : Azure Icon(left hand side panel) => Workspace => Local Project => Functions => right click on HttpExample => Execute function now => Hit enter
