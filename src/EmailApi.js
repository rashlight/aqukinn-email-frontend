function send_emails(msg){
  alert(msg);
}

function send_custom(reciever, msg)
{
  alert(reciever);
}

function get_quota()
{
  alert("you have <todo> emails left");;
}

module.exports = {
  send_emails,
  send_custom,
  get_quota
}; 
