import React from 'react'

export const Home=()=>(
    <React.Fragment>
        <html lang="en" dir="ltr">

            <head>
                <meta charset="utf-8"/>
                <title>Behaviorics Home</title>
                {/* <link rel="stylesheet" href="CSS/styles.css"/>  */}
            </head>

            <body>
                <div class="navbar">
                    <div class="navbar-content">
                        <span class="navbar-logo">Home</span>
                        <span class="navbar-button"><a class="btn dark" href="/login">login</a></span>
                        <span class="navbar-item">About</span>
                        <span class="navbar-item">Contact</span>
                        <span class="navbar-item">Devog</span>
                    </div>
                </div>

                <section class="video-section">
                    <div class="page-content">
                        <div class="video-text">
                            <h3 class="section-head">Manage Videos</h3>
                            <img class="home-img" src="https://i.pinimg.com/originals/63/49/a6/6349a6e2c75a7ba79f0d413f4557bbd6.jpg" alt="Camera Footage"/>
                            <p class="section-text">
                            Gather information from what you upload<br />
                            <a class="btn light inline-btn" href="#">learn more</a>
                            </p>
                        </div>
                    </div>    
                </section>

                <section class="info-section">
                    <div class="belief-text">
                        <h3 class="subheader">what we believe in</h3>
                        <p class="description">More accurate data collection</p>
                    </div>
                    <hr class="section-divider"/>
                    <div class="about-text">

                        <h3 class="subheader">about</h3>
                        <img class="about-img" src="https://lh3.googleusercontent.com/proxy/lriRUAy5wYROWzv3GtVGu4D5eWOj-bHWzMZXcbyR409I0nCX6m-cAiB3GIlFyiDQbs78ydrBc2T4BgWCVY-kxB6AjnCBjQs3b_s0YWDqplkeUPMvHO--galdft8w-sPzfAhKD8r_8yE" alt=""/>
                        <p class="description">Who we are</p>
                        <p class="info-txt">Behaviorics provides the CamHealth  software solution that monitors the health of your video surveillance system. CamHealth can detect failures and visual obstructions instantly. The software will automatically identify, log, and report these occurrences.</p>
                        <hr class="subdivider"/>
                        <a class="btn dark" href="">learn more</a>
                    </div>
                </section>


            </body>
        </html>    
    </React.Fragment>
    
)