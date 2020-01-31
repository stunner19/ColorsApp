import sizes from './sizes';

const styles = {
    root : {
        backgroundColor : "blue",
        height : "150vh",
        display : "flex",
        alignItems : "flex-start",
        justifyContent : "center"
    },
    container : {
        width : "50%",
        display : "flex",
        alignItems : "flex-start",
        flexDirection : "column",
        flexWrap : "wrap",
        [sizes.down("xl")]: {
            width : "80%"
        },
        [sizes.down("xs")]: {
            width : "70%"
        }
    },
    nav : {
        display : "flex",
        width : "100%",
        justifyContent : "space-between",
        color : "white",
        alignItems : "center",
        "& a" : {
            color : "white"
        }
    },
    palettes : {
        boxSizing : "border-box",
        width : "100%",
        display : "grid",
        gridTemplateColumns : "repeat(3,30%)",
        gridGap : "4rem",
        [sizes.down("md")]: {
            gridTemplateColumns : "repeat(2,50%)",
            gridGap : "2.5rem",
        },
        [sizes.down("xs")]: {
            gridTemplateColumns : "repeat(1,100%)",
            gridGap : "2rem"
        }
    }
};

export default styles;