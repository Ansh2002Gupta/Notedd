# Introduction
**Notedd** is a web based application, basically a storage space for your personal notes. Here you can safely, securely, smoothly store your personal notes. The notes are properly organised and managed. There is lot to tell and lot to know so stay with me till the end of this file lest you would miss a lot! 

# Special Features
<ul>
  <li>The website is end-to-end secure with a beautifull signIn and signUp page. It uses <i>Json Web Token</i> for easy user authentications.</li>
  <li>It consists of two webpages inside it, namely **Home** and **About**.</li>
  <li><i>About</i> section is yet to be developed and is our future plan.</li>
  <li><i>Home</i> section consists of a lot of instructing stuff. Firstly, it has a beautiful interface through which you can add you notes. This interface is fully secure and is robust.</li>
  <li>Just below it we have a section where we display all the notes that are related to the user. The app is smart enough in judging to remove this setion if no notes are present.</li>
  <li></li>
</ul>

# Architectural Design
**Webpages and components** <br>
All the webpages and components have been made with *ReactJs, JavaScript, HTML, Tailwind CSS.* <br>
<br> **Communication between Server and CLient** <br>
A *Rest Api* has been created to act as an interface in transfering the information from client to server and vice-versa. The database administrator used in MySql Workbench.<br>
<br> **User Authentication System** <br>
The signIn and signUp pages provide the user authentication system through *Json Web Token*. It is used to generate the authentication token which is used to authorize the user to enter into the website and for various other task like to update or delete a post only if it belongs to him.<br>
<br> **Data Storage** <br>
All the information related to the user is getting stored in the MySql database. Used a different library known as *Multer* that allows to store the images uploaded by the user into the database as well as on the client side. This not only removes the storage issues but also help in fast retrieval of the data.<br> 

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
  <li>Download the <a href="https://dev.mysql.com/downloads/workbench/">MySql Workbench</a>. Create database <i>blog</i> which contains two tables <i>users</i> and <i>posts</i>.</li>
  <li>Always keep your MySql Workbench in a <b>running state.</b></li>
  <li>Split the command line into two and change the directories to Server and Client folder in respective folder and run <i>npm run start</i> and <i>npm run dev</i></li>
  <li><b>Enjoy!! :)</b></li>
</ul>

# Screenshots
