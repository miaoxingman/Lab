## How to

### 1. How to add proxy to maven
cat ~/.m2/settings.xml

```
<settings>
  <proxies>
    <proxy>
      <id>genproxy</id>
      <active>true</active>
      <protocol>http</protocol>
      <host>proxy.vmware.com</host>
      <port>3128</port>
    </proxy>
 </proxies>
</settings>
```
### 2. How to add proxy to eclipse

https://www.mkyong.com/web-development/how-to-configure-proxy-settings-in-eclipse/

### 3. How to install tomcat in MacOS

* brew install tomcat
* ls /usr/local/Cellar/ 
	* Homebrew keeps packages (known as kegs) in the Cellar, where you can check config and data files. It is a directory located at 
* brew services list
	* Verify the Tomcat installation using homebrew’s handy “services” utility.
* Run Tomcat Server
	* ls /usr/local/Cellar/tomcat/
	* /usr/local/Cellar/tomcat/[version]/bin/catalina run
* Test Tomcat 
	* http://localhost:8080/
* deployed applications are usually then located under the directory
	* /usr/local/Cellar/tomcat/[version]/libexec/webapps/

### 4. How to add apache-tomcat into Eclipse 

* go to Help/Install new Software choose "All Available sites"
and search for "server"

* You will see "Web, Xml, Java EE and OSGi Enterprise Development" Install this Software.
* After a restart of Eclipse go to Window/Preferences/Server/Runtime Enviroments and click "add"
* If installed using brew, set the tomcat installation path to /usr/local/Cellar/tomcat7/7.0.57/libexec/ 

### 5. How to create a jersey project.
* mvn archetype:generate -DgroupId= com.miaoxingman.jersey -DartifactId=JerseyExample -DarchetypeArtifactId=maven-archetype-webapp
* http://www.codedata.com.tw/java/java-restful-1-jersey-and-jax-rs/