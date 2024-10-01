// "use client"


// import * as React from 'react';
// import { AppBar, Box, Toolbar, Typography, Container, IconButton, Menu, createSvgIcon, ListItemIcon, ListItemText, Collapse, Button, MenuItem } from '@mui/material';
// import { useRouter } from 'next/navigation'
// import MenuIcon from '@mui/icons-material/Menu';
// import scenes from '../utils/scenes'
// import { backgroundContext, randomScenePath } from '../nostalgia/sceneUtil';

// function Header() {
//   const router = useRouter();
//   const [isHover, setIsHover] = React.useState<boolean>(true);
//   React.useEffect(() => setIsHover(false), []);

//   return (
//     <AppBar position="fixed" elevation={0}
//       sx={{
//         backgroundColor: "transparent", transitionProperty: "all",
//         transitionDuration: isHover ? "0.7s" : "2s",
//         transitionDelay: isHover ? "0s" : "2s",
//         opacity: isHover ? 1 : 0
//       }}
//       onMouseEnter={() => setIsHover(true)}
//       onMouseLeave={() => setIsHover(false)}>
//       <Container maxWidth="xl">
//         <Toolbar sx={{ px: 4 }}>
//           <Typography noWrap variant='h6'
//             onClick={() => router.push("/")}
//             sx={{ cursor: "pointer" }}>
//             NOSTALGIA .Z
//           </Typography>

//           <Box sx={{ flexGrow: 1 }} />

//           <FullMenu />
//           <CollapsedMenu />
//         </Toolbar>
//       </Container>
//     </AppBar >
//   );
// }

// function FullMenu() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
//   const handleCloseNavMenu = () => setAnchorElNav(null);

//   const updateScene = React.useContext(backgroundContext);

//   return (
//     <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//       <Button variant='text' color="inherit">
//         About Zane
//       </Button>
//       <Button variant='text' color="inherit"
//         onClick={() => updateScene(randomScenePath())}>
//         Next Scene
//       </Button>
//       <Button variant='text' color="inherit"
//         onClick={handleOpenNavMenu}>
//         Scenes
//       </Button>

//       <Menu keepMounted anchorEl={anchorElNav}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
//         transformOrigin={{ vertical: 'top', horizontal: 'left', }}
//         open={!!anchorElNav} onClose={handleCloseNavMenu}
//       >
//         <SceneMenu open={true} toggle={() => { }} />
//       </Menu>
//     </Box>
//   )
// }

// function CollapsedMenu() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   const [isSceneMenuOpen, toggleSceneMenu] = React.useState<boolean>(false);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
//   const handleCloseNavMenu = () => setAnchorElNav(null);

//   const updateScene = React.useContext(backgroundContext);

//   return (
//     <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
//       <IconButton size="large" onClick={handleOpenNavMenu}>
//         <MenuIcon />
//       </IconButton>
//       <Menu keepMounted anchorEl={anchorElNav}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
//         transformOrigin={{ vertical: 'top', horizontal: 'left', }}
//         open={!!anchorElNav} onClose={handleCloseNavMenu}
//       >
//         <MenuItem dense
//           onClick={() => { handleCloseNavMenu() }}>
//           <Typography variant='button'>About Zane</Typography>
//         </MenuItem>

//         <MenuItem dense
//           onClick={() => {
//             updateScene(randomScenePath());
//             handleCloseNavMenu();
//           }}>
//           <Typography variant='button'>Next Scene</Typography>
//         </MenuItem>

//         <MenuItem dense
//           onClick={() => toggleSceneMenu(!isSceneMenuOpen)}>
//           <Typography variant='button'>Scenes</Typography>
//         </MenuItem>

//         <SceneMenu open={isSceneMenuOpen} toggle={toggleSceneMenu} />
//       </Menu>
//     </Box >
//   )
// }

// function SceneMenu({ open, toggle }: {
//   open: boolean,
//   toggle: (open: boolean) => void,
// }) {
//   const updateScene = React.useContext(backgroundContext);

//   const sceneListItemLists = React.useMemo(
//     () => scenes.map(({ iconSvg, name }) => {
//       const IconComponent = createSvgIcon(iconSvg, name);
//       return (
//         <MenuItem dense key={name}
//           onClick={() => {
//             toggle(false);
//             updateScene(name);
//           }}>
//           <ListItemIcon><IconComponent /></ListItemIcon>
//           <ListItemText primary={name} />
//         </MenuItem>
//       )
//     }), []
//   )

//   return (
//     <Collapse in={open} timeout="auto" unmountOnExit>
//       <Box>
//         {sceneListItemLists}
//       </Box>
//     </Collapse>
//   )
// }

import { styled } from "@pigment-css/react";
import { H4Typography } from "./Typography";
import Section from "./Section";

const HeaderBar = styled(Section)(({ theme }) => ({
  position: "fixed", backgroundColor: theme.vars.colors.primary.background,

  opacity: "0",
  transition: "all 2s ease 2s",
  animation: "showOnLoad 2s ease 2s backwards",

  "&:hover": {
    transitionDuration: "0.7s", transitionDelay: "0s",
    opacity: 1,
  },
  "@keyframes showOnLoad": {
    "0%": {
      opacity: 1
    },
    "100%": {
      opacity: 0
    }
  }
}));

export default function Header() {


  return (
    <HeaderBar>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <H4Typography color="primary">NOSTALGIA .Z</H4Typography>
        <div style={{ flex: "1 1" }} />
      </div>
    </HeaderBar>
  )
};
