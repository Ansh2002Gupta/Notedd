# Introduction
**Notedd** is a web based application, basically a storage space for your personal notes. Here you can safely, securely, smoothly store your personal notes. The notes are properly organised and managed. There is lot to tell and lot to know so stay with me till the end of this file lest you would miss a lot! 

# Special Features
<ul>
  <li>The website is end-to-end secure with a beautifull signIn and signUp page. It uses <i>Json Web Token</i> for easy user authentications.</li>
  <li>It consists of two webpages inside it, namely <i>Home</i> and <i>About</i>.</li>
  <li><i>About</i> section is yet to be developed and is our future plan.</li>
  <li><i>Home</i> section consists of a lot of instructing stuff. Firstly, it has a beautiful interface through which you can add you notes. This interface is fully secure and is robust.</li>
  <li>Just below it we have a section where we display all the notes that are related to the user. The app is smart enough in judging to remove this setion if no notes are present.</li>
  <li>An authorized user can only create, read, update and delete the notes. One user can't delete someones eles notes untill and unless they have an authorised access to their notes.</li>
</ul>

# Architectural Design
**Webpages and components** <br>
All the webpages and components have been made with *ReactJs, JavaScript, HTML, Bootstrap.* <br>
<br> **Communication between Server and Client** <br>
A *Rest Api* has been created to act as an interface in transfering the information from client to server and vice-versa. The database administrator used is MongoDB Compass.<br>
<br> **User Authentication System** <br>
The signIn and signUp pages provide the user authentication system through *Json Web Token*. It is used to generate the authentication token which is used to authorize the user to enter into the website and for various other task like to update or delete a post only if it belongs to him.<br>

# How to run on localhost ?
**Prerequistes**
<ol>
  <li>Vs code should be installed.</li>
  <li> Run install <a href="https://nodejs.org/en/download">NodeJs</a></li>
</ol>
<hr>
<ul>
  <li>Firstly clone this repository into a single folder in your computer.</li>
  <li>Open the folder inside <a href="https://code.visualstudio.com/download">VS Code</a></li>
  <li>Install all the dependencies required in creating the project.</li>
  <li>Inside the Server folder install ExpressJS using <i>npm install express</i>.</li>
  <li>Download the <a href="https://www.mongodb.com/try/download/compass">MongoDB Compass</a>. Create database <i>blog</i> which contains two tables <i>users</i> and <i>notes</i>.</li>
  <li>Always keep your MongoDB Compass in a <b>running state.</b></li>
  <li>Split the command line into two and change the directories to Server and Client folder in respective folder and run <i>npm run start</i> and <i>npm run dev</i></li>
  <li><b>Enjoy!! :)</b></li>
</ul>

# Screenshots
![notedd1](https://github.com/Ansh2002Gupta/Notedd/assets/84438495/0c20c96d-6c41-4778-8aa0-61d4c4893bb0)
![notedd3](https://github.com/Ansh2002Gupta/Notedd/assets/84438495/17c68c11-4e45-43a6-a394-a6c6b5e12598)
![notedd2](https://github.com/Ansh2002Gupta/Notedd/assets/84438495/e047cbd2-08ea-4d95-8188-ce050ed78066)
![notedd7](https://github.com/Ansh2002Gupta/Notedd/assets/84438495/c60853c2-6709-4e7a-af3d-02133dc75d44)
![notedd6](https://github.com/Ansh2002Gupta/Notedd/assets/84438495/689aebf5-4603-4408-8fed-39647176b17f)
![notedd5](https://github.com/Ansh2002Gupta/Notedd/assets/84438495/8e48af7b-5cb7-4142-be6b-bd1f268f11d4)
![notedd4](https://github.com/Ansh2002Gupta/Notedd/assets/84438495/3a375b32-83ab-4b99-851b-93379823b53a)
