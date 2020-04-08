import React from 'react'

export const Home=()=>(
    <React.Fragment>
        <html lang="en" dir="ltr">

            <head>
                <meta charSet="utf-8"/>
                <title>Behaviorics Home</title>
                {/* <link rel="stylesheet" href="CSS/styles.css"/>  */}
            </head>

            <body>
                {/* <div class="navbar">
                    <div class="navbar-content">
                        <span class="navbar-logo">Home</span>
                        <span class="navbar-button"><a class="btn dark" href="/login">login</a></span>
                        <span class="navbar-item">About</span>
                        <span class="navbar-item">Contact</span>
                        <span class="navbar-item">Devog</span>
                    </div>
                </div> */}

                <section className="video-section">
                    <div className="page-content">
                        <div className="video-text">
                            <h3 className="section-head">Manage Videos</h3>
                            <img className="home-img" src="https://i.pinimg.com/originals/63/49/a6/6349a6e2c75a7ba79f0d413f4557bbd6.jpg" alt="Camera Footage"/>
                            <p className="section-text">
                            Gather information from what you upload<br />
                            <a className="btn light inline-btn" href="#">learn more</a>
                            </p>
                        </div>
                    </div>    
                </section>

                <section className="info-section">
                    <div className="belief-text">
                        <h3 className="subheader">what we believe in</h3>
                        <p className="description">More accurate data collection</p>
                    </div>
                    <hr className="section-divider"/>
                    <div className="about-text">

                        <h3 className="subheader">about</h3>
                        <img className="about-img" src="https://lh3.googleusercontent.com/proxy/lriRUAy5wYROWzv3GtVGu4D5eWOj-bHWzMZXcbyR409I0nCX6m-cAiB3GIlFyiDQbs78ydrBc2T4BgWCVY-kxB6AjnCBjQs3b_s0YWDqplkeUPMvHO--galdft8w-sPzfAhKD8r_8yE" alt=""/>
                        <p className="description">Who we are</p>
                        <p className="info-txt">Behaviorics provides the CamHealth  software solution that monitors the health of your video surveillance system. CamHealth can detect failures and visual obstructions instantly. The software will automatically identify, log, and report these occurrences.</p>
                        <hr className="subdivider"/>
                        <a className="btn dark" href="">learn more</a>
                    </div>
                </section>


            </body>
        </html>    
    </React.Fragment>
    
)