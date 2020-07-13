import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 600,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


 const tileData = [
       {
             img: 'http://placeimg.com/80/80/any',
             title: 'Image',
             author: 'author',
            featured: false,
          },
     {
         img: 'http://placeimg.com/80/80/any',
         title: 'Image',
         author: 'author',
         featured: false,
     },
     {
         img: 'http://placeimg.com/80/80/any',
         title: 'Image',
         author: 'author',
         featured: false,
     },       {
         img: 'http://placeimg.com/80/80/any',
         title: 'Image',
         author: 'author',
         featured: false,
     },       {
         img: 'http://placeimg.com/80/80/any',
         title: 'Image',
         author: 'author',
         featured: false,
     },
     {
         img: 'http://placeimg.com/80/80/any',
         title: 'Image',
         author: 'author',
         featured: false,
     },
     {
         img: 'http://placeimg.com/80/80/any',
         title: 'Image',
         author: 'author',
         featured: false,
     },{
         img: 'http://placeimg.com/80/80/any',
         title: 'Image',
         author: 'author',
         featured: false,
     },{
         img: 'http://placeimg.com/80/80/any',
         title: 'Image',
         author: 'author',
         featured: false,
     },{
         img: 'http://placeimg.com/80/80/any',
         title: 'Image',
         author: 'author',
         featured: false,
     },




 ];

export default function WorkedImg() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={100} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader style={{textAlign:'center', border:'1px solid black', borderRadius:5, height:60}}><h3 style={{fontWeight:"bold", marginTop: 5}}>이전작업</h3></ListSubheader>
                </GridListTile>
                {tileData.map((tile) => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
