import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

import Header from '../components/Header';
import SocialLinks from '../components/SocialLinks';
import PortfolioGrid from '../components/PortfolioGrid';
import Resume from '../components/Resume';


function Profile() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [files, setFiles] = useState<HTMLInputElement | null>(null);

    const handleUpload = async (e: any) => {
      e.preventDefault();

      if (files == null) {
        return;
      }

      const accessToken = await getAccessTokenSilently();
      let file = files.files![0];
      let fileParts = files.files![0].name.split('.');
      let fileName = fileParts[0];
      let fileType = fileParts[1];

      let response = await axios({
        url: '/api/upload',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        data: {fileName, fileType}
      });

      let signedRequest = response.data.data.signedRequest;
      
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };

      axios.put(signedRequest, file, options)
      .then(result => {
        console.log("Response from s3");
        console.log(result);
      })
      .catch(error => {
        console.log("ERROR\n"+JSON.stringify(error));
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
    }

    return(
      <div className="App">
        <Header pageKey="profile" />
            
        <div className="grid-main-layout-primary">
          <Resume
            name="Jane Doe"
            profile="I am a capable and creative computer science student with a flair for problem solving. I have strong technical, interpersonal and communication skills and am aiming to pursue a career in software engineering & design. "
            student="The University of Melbourne"
            location="Melbourne, Australia"
            work={true}
          />
          <PortfolioGrid />
        </div>
          
        {isAuthenticated
        ? 
        <div>
          <h2> User: {user.name} </h2>
          <p> Email: {user.email} </p>   
          <p> Email: {user.email} </p>   
          <p> Email: {user.email} </p>   
        </div>
        : 
        <div>
          <h2> Not logged in </h2>
        </div>
        }

        <SocialLinks />
        <div>
          <h2>Upload a file</h2>
          {/* BUG: credentials are null in AWS S3 object so uploadFile fails */}
          <form onSubmit={handleUpload}>
            <input type="file" ref={(ref) => { setFiles(ref) }} multiple/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
}

export default Profile;