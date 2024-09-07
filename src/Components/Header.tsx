import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Container, IconButton, Menu, createSvgIcon, ListItemIcon, ListItemText, Collapse, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import scenes from '../Scenes'

function Header() {
  const navigate = useNavigate();
  const [isHover, setIsHover] = React.useState<boolean>(true);
  React.useEffect(() => setIsHover(false), []);

  return (
    <AppBar position="fixed" elevation={0}
      sx={{
        backgroundColor: "transparent", transitionProperty: "all",
        transitionDuration: isHover ? "0.7s" : "2s",
        transitionDelay: isHover ? "0s" : "2s",
        opacity: isHover ? 1 : 0
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <Container maxWidth="xl">
        <Toolbar sx={{ px: 4 }}>
          <Typography noWrap variant='h6'
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}>
            NOSTALGIA .Z
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <FullMenu />
          <CollapsedMenu />
        </Toolbar>
      </Container>
    </AppBar >
  );
}

function FullMenu() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Button variant='text' color="inherit">
        About Zane
      </Button>
      <Button variant='text' color="inherit"
        onClick={() => navigate("/")}>
        Next Scene
      </Button>
      <Button variant='text' color="inherit"
        onClick={handleOpenNavMenu}>
        Scenes
      </Button>

      <Menu keepMounted anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
        transformOrigin={{ vertical: 'top', horizontal: 'left', }}
        open={!!anchorElNav} onClose={handleCloseNavMenu}
      >
        <SceneMenu open={true} toggle={() => { }} />
      </Menu>
    </Box>
  )
}

function CollapsedMenu() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [isSceneMenuOpen, toggleSceneMenu] = React.useState<boolean>(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      <IconButton size="large" onClick={handleOpenNavMenu}>
        <MenuIcon />
      </IconButton>
      <Menu keepMounted anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
        transformOrigin={{ vertical: 'top', horizontal: 'left', }}
        open={!!anchorElNav} onClose={handleCloseNavMenu}
      >
        <MenuItem dense
          onClick={() => { handleCloseNavMenu() }}>
          <Typography variant='button'>About Zane</Typography>
        </MenuItem>

        <MenuItem dense
          onClick={() => {
            navigate("/");
            handleCloseNavMenu();
          }}>
          <Typography variant='button'>Next Scene</Typography>
        </MenuItem>

        <MenuItem dense
          onClick={() => toggleSceneMenu(!isSceneMenuOpen)}>
          <Typography variant='button'>Scenes</Typography>
        </MenuItem>

        <SceneMenu open={isSceneMenuOpen} toggle={toggleSceneMenu} />
      </Menu>
    </Box >
  )
}

function SceneMenu({ open, toggle }: {
  open: boolean,
  toggle: (open: boolean) => void,
}) {
  const navigate = useNavigate();

  const sceneListItemLists = React.useMemo(
    () => scenes.map(({ iconSvg, name, path }) => {
      const IconComponent = createSvgIcon(iconSvg, name);
      return (
        <MenuItem dense
          onClick={() => {
            toggle(false);
            navigate(path);
          }}>
          <ListItemIcon><IconComponent /></ListItemIcon>
          <ListItemText primary={name} />
        </MenuItem>
      )
    }), []
  )

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box>
        {sceneListItemLists}
      </Box>
    </Collapse>
  )
}



export default Header;
