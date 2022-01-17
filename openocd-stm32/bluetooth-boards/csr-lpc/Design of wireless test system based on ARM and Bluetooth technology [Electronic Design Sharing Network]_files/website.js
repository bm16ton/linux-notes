var tID=0;
function Showcl_Tabs(ID){
if(ID!=tID){
  cl_TabTitle[tID].className="cl_menu_title";
  cl_TabTitle[ID].className="cl_menu_title_on";
  cl_Tabs[tID].style.display="none";
  cl_Tabs[ID].style.display="";
  tID=ID;
}
}