import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect,  useState } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';





const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            
        },
    },
    container: {
        width: "100%",
        height: "fit-content",
        marginTop: 500,
        marginBottom: 500,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"

    },



}));
const Home = () => {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [textData, setTextData] = useState([]);
    let [videoIndex, setVideoIndex] = useState(0);

    const videoLinks = ['https://global-uploads.webflow.com/62efc7cb58ad153bfb146988/6341303c29c5340961dc9ae6_Mco-1-transcode.mp4',
        'https://global-uploads.webflow.com/62efc7cb58ad153bfb146988/63413ff244f1dc616b7148a0_Mco-transcode.mp4',
        'https://global-uploads.webflow.com/62efc7cb58ad153bfb146988/63455a67996ba248148c4e31_add-options%20(3)-transcode.mp4']



    const handleData = async () => {
        setLoading(false);
        const { data } = await axios.get('https://mocki.io/v1/ee762599-31ae-4a3d-a6c7-d596525945e1');
        setTextData(data.texts);
        setLoading(true);

        console.log(textData);
        console.log(data);
    }



    useEffect(() => {

        handleData();



    }, [])

    
    const setScroll = () => {
        if(window.scrollY<840){
            setVideoIndex(0);
            videoIndex=0;

        }
        else if(window.scrollY>=840 && window.scrollY<1584){
            setVideoIndex(1);
            videoIndex=1;

        }
        else if(window.scrollY>=1584){
            setVideoIndex(2);
            videoIndex=2;

        }
    };
    React.useEffect(() => {
        window.addEventListener("scroll", setScroll);
        return () => {
            window.removeEventListener("scroll", setScroll);
        };
    }, []);






    return (
        <>
            <div className={classes.container}>

                <div style={{ width: "49%",  height: 2000, display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", overflow: "hidden", overflowY: "scroll" }}>
                    {

                        (!loading) ? (
                            <>


                            </>
                        ) : (

                            <>
                                {
                                    (textData).map((item, index) => {


                                        return (
                                            <div key={index} style={{ width: "75%", height: "fit-content", marginTop: 5 }} >

                                                <h2 style={{backgroundImage: "linear-gradient(60deg,#ff3a7c,#741eff)",WebkitTextFillColor: "transparent",backgroundClip: "text"}}>{item.heading}</h2>
                                                <h2 style={{ fontSize: 50 }}>{item.subHeading}</h2>
                                                <p>{item.description}</p>


                                            </div>
                                        )

                                    })
                                }

                            </>

                        )

                    }




                </div>
                <div style={{ width: "40%", border: "2px solid blue", height: "400px", borderRadius: 50, overflow: "hidden", position: "sticky", top: 200 }}>

                    <Video key={videoIndex} autoPlay loop muted controls={false} height="750" width="650" style={{ position: "absolute", top: -180, left: -15 }} >
                        <source src={videoLinks[videoIndex]} />
                    </Video>
                </div>

            </div>

        </>
    )
}

export default Home