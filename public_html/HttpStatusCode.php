<?php
class HttpStatusCode {
  public function __construct($code, $msg){
  // error
  http_response_code($code);
  echo $msg;
  exit();  //leave php request
  }
}


