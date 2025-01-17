import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import ButtonMailto from './ButtonMailto'
import profilePict from './../assets/images/profilePict.jpeg'
import DataScience from './../assets/images/DataScience.png'
import WebDev from './../assets/images/WebDevelopment.jpg'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    Paper: {
        overflow: "auto",
        position: "relative",
        maxWidth: 1000,
        margin: `${theme.spacing(10)}px auto`,
        backgroundColor: theme.palette.primary.main,
        '@media (max-width: 600px)': {
            padding: `${theme.spacing(0)}px ${theme.spacing(1.5)}px`
        }
    },
    title: {
        position: "absolute",
        left: 40, bottom: 20,
        float: "left",
        padding: `${theme.spacing(3)}px ${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.secondary.main,
        '@media (max-width: 600px)': {
            position: "relative",
            left: 0, bottom:0,
            width: "100%",
            padding: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
        }
    },
    media: {
        width: "40%",
        float: "right",
        '@media (max-width: 600px)': {
            width: "100%"
        }
    },
    wrapper: {
        display: "flex",
        flexFlow: "column",
        backgroundColor: theme.palette.primary.main
    },
    work: {
        margin: `${theme.spacing(2)}px 0`
    },
    relative: {
        position: "relative"
    },
    loaded: {
        width: "100%"
    },
    overlay: {
        position: "absolute",
        top: 0, 
        left: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        transition: "0.8s ease",
        opacity: 0,
        "&:hover": {
            opacity: "0.5"
        }
    },
    link: {
        color: theme.palette.secondary.dark
    }
}))

export default function Home() {
    const classes = useStyles()
    const [visible, setVisible] = React.useState({
        itemOne: false,
        itemTwo: false,
        itemThree: false
    })
    
    const props = { classes, visible }

    const refOne = React.useRef(null),
    refTwo = React.useRef(null)

    React.useEffect(() => {
        window.scrollTo(0, 0)
        
        setVisible(state => ({...state, itemThree: true}))

        const topPos = (e) => e.getBoundingClientRect().top
        const divOnePos = topPos(refOne.current),
        divTwoPos = topPos(refTwo.current)

        const onScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight

            if (divOnePos < scrollPos) {
                setVisible(state => ({ ...state, itemOne: true }))
            } else if (divTwoPos < scrollPos) {
                setVisible(state => ({ ...state, itemTwo: true }))
            }
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])
    
    return (
        <div className={classes.root}>
            <Slide direction="right"
                in={visible.itemThree}
                {...(visible.itemThree ? { timeout: 1000 } : {})}
            >
                <Paper elevation={0} className={classes.Paper}>
                    <CardContent className={classes.title}>
                        <Typography variant="h3" component="p" align="right">
                            Hi, I am Adhytia.<br/>
                            A Data Scientist & Web Developer.<br/>
                            Welcome to my portfolio!
                        </Typography>
                    </CardContent>
                    <CardMedia component="img" className={classes.media} image={profilePict} title="Profile Picture"/>
                </Paper>
            </Slide>
            <Paper elevation={0} className={classes.wrapper}>
                <Work {...props} ref={refTwo}/>
                <Resume {...props} ref={refOne}/>
            </Paper>
        </div>
    )
}

const Work = React.forwardRef((props, ref) => {
    return (
        <Slide direction="right"
            in={props.visible.itemTwo}
            {...(props.visible.itemTwo ? { timeout: 1000 } : {})}
        >
            <Paper elevation={0} className={props.classes.work} ref={ref}>
                <Link to="/data-science">
                    <Paper elevation={0} className={props.classes.relative}>
                        <CardMedia component="img" className={props.classes.loaded} image={DataScience} title="Data Science"/>
                        <CardMedia component="div" className={props.classes.overlay}/>
                    </Paper>
                </Link>
                <Link to="/web-development">
                    <Paper elevation={0} className={props.classes.relative}>
                        <CardMedia component="img" className={props.classes.loaded} image={WebDev} title="Web Developement"/>
                        <CardMedia component="div" className={props.classes.overlay}/>
                    </Paper>
                </Link>
            </Paper>
        </Slide>
    )
})

const Resume = React.forwardRef((props, ref) => {
    return (
        <Slide direction="right" 
            in={props.visible.itemOne}
            {...(props.visible.itemOne ? { timeout: 1000 } : {})}
            >
            <Paper elevation={0} className={props.classes.Paper} ref={ref}>
                <CardContent color="inherit"> 
                    <Typography variant="h6" component="p" align="center">
                        Check out my <Link to="/resume" className={props.classes.link}>resume</Link> for more→
                    </Typography>
                    <Typography variant="h6" component="p" align="center">
                        Feel free to chat <ButtonMailto mailto="mailto:adhyttungga.jkt@gmail.com" label="adhyttungga.jkt@gmail.com"/>
                    </Typography>
                </CardContent>
            </Paper>
        </Slide>
    )
})
