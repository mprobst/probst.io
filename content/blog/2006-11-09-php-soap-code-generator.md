---
title: "PHP Soap \"code generator\""
date: 2006-11-09T12:01:27+00:00
updated: 2011-08-24T12:12:12.959000+00:00
url: /blog/2006/11/09/php-soap-code-generator/
draft: false
comments: 3
---

I somehow tragically got into a project where we need to access fairly complicated SAP WebServices from PHP using SOAP. PHP provides the SoapClient class, but there is apparently no way to generate code from WSDL files to make your life easier. I created two small tools to help me with that, one to make a WSDL definition browsable, another one to somehow generate PHP code from the WSDL.

dumpws.php:

```
<?php
include('../main/auth.php');

if (isset($argv[1])) {
  $wsdl = $argv[1];
} else if (isset($_GET["wsdl"])) {
  $wsdl = $_GET["wsdl"];
} else {
  echo '<form method="GET" action="' . $_SERVER["PHP_SELF"] . '">' . "\\n";
  echo 'Specify a WSDL to dump: <input name="wsdl" type="text"/></form>';
  exit(0);
}

// replace word character groups delimited by non-words with a hrefs to #word
function hrefify($str) {
  return preg_replace('/(\\\\W)?(\\\\w+)(\\\\W)?/', '\\\\1<a href=\\'#\\\\2\\'>$2</a>\\\\3', $str);
}

$options = $SAP_AUTH;
try {
  $soap = new SoapClient($wsdl, $options);
  echo "<h1>$wsdl</h1>";
  echo "<h2>Types:</h2>\\n";
  echo "<pre class="prettyprint">\\n";
  foreach($soap->__getTypes() as $name => $type) {
    preg_match('/\\w+ (\\w+)/', $type, $matches);
    $name = $matches[1];
    echo "<h4><a id='$name'>$name</a></h4>\\n";
    echo hrefify($type);
  }
  echo "</pre>\\n";
  echo "<h2>Functions:</h2>\\n";
  echo "<pre class="prettyprint">\\n";
  foreach($soap->__getFunctions() as $name => $func) {
    preg_match('/\\w+ (\\w+)/', $type, $matches);
    $name = $matches[1];
    echo "<h4><a id='$name'>$name</a></h4>\\n";
    echo hrefify($func);
  }
  echo "</pre>\\n";
} catch (SoapFault $f) {
  echo $f;
}
?>
```

create_types.php:

```
<?php
/*
 * Use to transform the types in a given WSDL file to PHP classes.
 * <p>
 * Think of this as a really poor code generator...
 */

include('../main/auth.php');

if (isset($argv[1]) && $argv[1] != "") {
  $wsdl = $argv[1];
} else if (isset($_GET["wsdl"]) && $_GET["wsdl"] != "") {
  $wsdl = $_GET["wsdl"];
} else {
  echo '<form method="GET" action="' . $_SERVER["PHP_SELF"] . '">' . "\\n";
  echo 'Specify a WSDL to transform to PHP: <input name="wsdl" type="text"/></form>';
  exit(0);
}

$options = $SAP_AUTH;
$actual_types;
try {
  $soap = new SoapClient($wsdl, $options);
  echo "<pre class="prettyprint">\\n";
  echo "&lt;?php\\n";
  echo "// This file was generated from $wsdl using create_types.php\\n\\n";
  $types = $soap->__getTypes();
  foreach($types as $type) {
    if (preg_match("/^struct.*/",$type)) {
      // this is a complex type
      preg_match('/struct (\\w+)/', $type, $matches);
      $name = $matches[1];
      $actual_types[$name] = $name;
      echo "class $name {\\n";
      $lines = array_slice(explode("\\n", $type), 1, -1);
      foreach ($lines as $line) {
        $line = preg_match('/ (\\w+) (\\w+);/', $line, $matches);
        $subtype = array_values(preg_grep("/^\\w+ $matches[1]/", $types));
        if (isset($subtype[0]) && !preg_match("/^struct.*/",$subtype[0])) {
          // primitive type
          echo "  // " . $subtype[0] . "\\n";
        } else {
          echo "  // " . $matches[1] . "\\n";
        }
        echo "  public \\$$matches[2];\\n";
      }
      echo "}\\n\\n";
    }
  }
  echo "\\$classmap = array(\\n";
  while (list($name, $class) = each($actual_types)) {
    echo "  \\"$name\\" => \\"$class\\"";
    if (current($actual_types)) {
      echo ",";
    }
    echo "\\n";
  }
  echo ");\\n";
  echo "?>";
  echo "</pre>\\n";
} catch (SoapFault $f) {
  echo $f;
}
?>
```
