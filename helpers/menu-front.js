const getMenuFrontEnd=(rol="nanny")=>{

    const menu=[
    {
      titulo: "Post Perfil",
      icono:"mdi mdi-folder-account",
      submenu:[
        {titulo:"Nanny",url:"nanny"},
        //{titulo:"Padre",url:"padre"},
      ]
    }
  ];
  if(rol==="padre"){
    menu[0].submenu.shift();
    menu[0].submenu.unshift({titulo:"Padre",url:"padre"});
    
  }
  return menu;
}
module.exports={
    getMenuFrontEnd
}