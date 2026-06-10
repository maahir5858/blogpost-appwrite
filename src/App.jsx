import './App.css'
import conf from './conf/conf';

function App() {

    // console.log(import.meta.env.VITE_APPWRITE_URL);
    // console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    // Better way to ACCESS Environment Variables   -->   config.js
    console.log(conf.appwriteUrl);
    console.log(conf.appwriteProjectId);

    return (
        <>
            <h1>A blog app with appwrite</h1>
        </>
    )
}

export default App
