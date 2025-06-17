<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description"
        content="Convert any list of data to array easily with ArrayCat. For example, a CSV file to JavaScript array without duplicate elements.">
  <meta name="author" content="Macecraft Software">
  <meta property="og:title" content="ArrayCat">
  <meta property="og:description"
        content="Convert a list of data to array easily with ArrayCat. For example, a CSV file to JavaScript array without duplicate elements.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://arraycat.com/">
  <meta property="og:image" content="https://arraycat.com/assets/images/arraycat.png">
  <title>Convert any string to array with ArrayCat</title>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="./assets/css/bootstrap.css">
  <link rel="stylesheet" href="./assets/css/loading.css">
  <link rel="stylesheet" href="./assets/css/style.css">
  <script defer data-domain="arraycat.com" src="https://plausible.io/js/script.js"></script>
</head>
<body class="home-page">
<header>
  <nav class="navbar navbar-expand-lg mx-auto py-0">
    <div class="d-flex w-100 justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <div class="navbar-brand mr-2">
          <img
            width="120"
            class="img-fluid"
            src="assets/images/logo.svg"
            alt="ArrayCat logo"
            title="ArrayCat is seepy after converting so many lists to arrays">
        </div>
        <div class="">
          <h1 class="mb-0">ArrayCat</h1>
          <h2 class="mb-0">Convert any string to array</h2>
        </div>
      </div>
        <div class="tumbler-wrapper">
            <img
                class="mode-toggle-icon"
                src="./assets/images/toggle_sun.png"
                alt="mode toggle"
            >
        </div>
    </div>
  </nav>
</header>
<main class="mx-auto mt-0 px-3 max-w-640">
  <div>
    <h3 style="font-size: 34px">Convert any strings to array with ArrayCat</h3>
    <p class="mt-sm-5 pb-4">
      ArrayCat is a free tool for converting a list of data or any string into an array. For example, you can convert a CSV file into
      a PHP array. Or, into a JavaScript array. Or even into a SQL insertion, which is technically not an array,
      but cats get confused sometimes.</p>

      <p>Not only string to array conversions, ArrayCat also supports various transformations,
      such as: sort lists, delete duplicates from lists, remove diacritics, convert data to lower case,
      base64 encode elements, convert to HTML entities, and much more.
      You can find the full list of supported transformations below.
    </p>
  </div>

  <div class="input-box p-4">
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center mb-3 mb-md-0">
        <p class="my-0 mr-2 font-weight-bold">Input data format:</p>
        <div class="selectBox dropdown">
          <div
            class="selectBox__value dropdown-toggle"
            data-toggle="dropdown"
            id="inputDataFormat"
          >
            One item per row
          </div>
          <div class="dropdown-menu">
            <a href="javascript:void(0)" class="dropdown-item ">Comma separated</a>
            <a href="javascript:void(0)" class="dropdown-item">Inside quotation marks</a>
            <a href="javascript:void(0)" class="dropdown-item active">One item per row</a>
            <a href="javascript:void(0)" class="dropdown-item">Tab separated</a>

          </div>
        </div>
      </div>
      <div class="d-flex">
        <button class="default-btn mr-2" id="exampleBtn">Example</button>
        <label class="default-btn" id="uploadBtn">
          <input type="file" id="uploadfile">
          Load file
        </label>
      </div>
    </div>
    <textarea
      class="text-area w-100 mt-3"
      name="inputData"
      id="inputData"
      rows="10"
      spellcheck="false"
    ></textarea>
  </div>
  <div class="text-center my-5">
    <button class="default-btn" id="convertBtn">Convert</button>
  </div>
  <div class="output-box p-4 mb-5">
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center mb-3 mb-md-0">
        <p class="my-0 mr-2 font-weight-bold">Output data format:</p>
        <div class="selectBox dropdown">
          <div
            class="selectBox__value dropdown-toggle"
            data-toggle="dropdown"
            id="outputDataFormat">
              One item per row
          </div>
          <div class="dropdown-menu">
            <a href="javascript:void(0)" class="dropdown-item">Delphi array</a>
            <a href="javascript:void(0)" class="dropdown-item">Go array</a>
            <a href="javascript:void(0)" class="dropdown-item">JavaScript array</a>
            <a href="javascript:void(0)" class="dropdown-item active">One item per row</a>
            <a href="javascript:void(0)" class="dropdown-item">Pascal array</a>
            <a href="javascript:void(0)" class="dropdown-item">PHP array</a>
            <a href="javascript:void(0)" class="dropdown-item">Python array</a>
            <a href="javascript:void(0)" class="dropdown-item">SQL insert</a>
          </div>
        </div>
      </div>
      <div class="d-flex">
        <div class="dropdown mr-2" id="transformDropdown">
          <button
            type="button"
            class="default-btn dropdown-toggle transform-toggle"
            data-toggle="dropdown">
            Transform &nbsp;
          </button>
          <div class="dropdown-menu px-3">
            <div class="py-2">
              <input type="checkbox" id="base64" name="base64">
              <label class="mb-0" for="base64">Base64 encode elements</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="countDuplicate" name="countDuplicate">
              <label class="mb-0" for="countDuplicate">Count duplicate elements</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="htmlEntities" name="htmlEntities">
              <label class="mb-0" for="htmlEntities">Convert to HTML entities</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="lowercase" name="lowercase">
              <label class="mb-0" for="lowercase">Convert to lower case</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="fixApostrophes" name="fixApostrophes">
              <label class="mb-0" for="fixApostrophes">Fix apostrophes</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="fixQuotes" name="fixQuotes">
              <label class="mb-0" for="fixQuotes">Fix quotation marks</label>
            </div>

            <div class="py-2">
              <input type="checkbox" id="normalize" name="normalize">
              <label class="mb-0" for="normalize">Remove diacritics</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="duplicates" name="duplicates">
              <label class="mb-0" for="duplicates">Remove duplicate elements</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="removeEmptyElement" name="removeEmptyElement" checked>
              <label class="mb-0" for="removeEmptyElement">Remove empty elements</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="removeTrailing" name="removeTrailing">
              <label class="mb-0" for="removeTrailing">Remove trailing separators</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="sort" name="sort">
              <label class="mb-0" for="sort">Sort elements</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="stripWhitespace" name="stripWhitespace">
              <label class="mb-0" for="stripWhitespace">Strip excess whitespace</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="unifyWhitespace" name="unifyWhitespace">
              <label class="mb-0" for="unifyWhitespace">Unify whitespace</label>
            </div>
            <div class="py-2">
              <input type="checkbox" id="whitespace" name="whitespace" checked>
              <label class="mb-0" for="whitespace">Trim whitespace</label>
            </div>

            <div id="maxrowwidthbox">
              <label for="maxRowWidth">Maximum row length:</label>
              <input
                type="number"
                id="maxRowWidth"
                value="512"
                min="1"
                name="maxRowWidth"
              >
            </div>
          </div>
        </div>
        <button class="default-btn" id="copyBtn">
          Copy<span class="d-none d-sm-inline"> to clipboard</span>
        </button>
      </div>
    </div>
    <div class="mt-3 w-100 bg-white br-12 overflowx-auto output-box-inner">
          <textarea
            class="text-area"
            name="outputData"
            id="outputData"
            spellcheck="false"
            readonly
          ></textarea>
    </div>
  </div>
  <div class="loading-element-mask">
    <div class="loading-element">
      <div class="inner one"></div>
      <div class="inner two"></div>
      <div class="inner three"></div>
    </div>
  </div>
</main>
<footer class="px-3">
  <div>
    <p><b>The following transformations are supported:</b></p>
    <ul>
      <li>Base64 encode each element.</li>
      <li>Count duplicate elements.</li>
      <li>Convert to HTML elements. This option will convert all applicable characters to HTML entities. For example,
        "Durian > Jackfruit" becomes "Durian &amp;gt; Jackfruit".
      </li>
      <li>Convert each element to lower case.</li>
      <li>Fix apostrophes. This option will replace commonly used wrong apostrophe characters with the correct apostrophe character. For example,
        "Jack's Durian" becomes "Jack’s Durian".
      </li>
      <li>Remove diacritics. This option will attempt to remove any diacritics and accent characters. For example,
        converting "Crème Brulée" into "Creme Brulee", which is equally yummy but possibly easier to process.
      </li>
      <li>Remove duplicate elements. Removes all duplicate elements, after other transformers have been run
        first. For example, if your list contains "John" and "john" and you have the <i>Convert each element to lower
          case</i> enabled, only "john" will be added to the final output.
      </li>
      <li>Remove empty elements.</li>
      <li>Sort elements. If enabled, the final output will be in alphabetical order.</li>
      <li>Strip excess whitespace. Removes any cases of multiple spaces between words.</li>
      <li>Unify whitespace. Replaces all whitespace characters with a single space.</li>
      <li>Trim whitespace. Removes any leading and trailing space characters of each element.</li>
    </ul>

    <h2 class="mt-5">Convert any string to array with ArrayCat</h2>
    <p>ArrayCat can <strong>convert any string to PHP array</strong>,
    and it can also <strong>convert any string to JavaScript array</strong>, SQL insertion, and more. Or,
    if you only need to remove duplicate elements from a list, you can use the <strong>Remove duplicates from array</strong> feature.
    </p>

    <h2 class="mt-5">Convert CSV to array format easily</h2>
    <p>Need to convert CSV data into arrays? ArrayCat makes it simple to <strong>convert CSV to PHP array</strong> or
    <strong>convert CSV to JavaScript array</strong>. Just paste your CSV data and choose your desired output format.</p>

    <h2 class="mt-5">Delete duplicates from list</h2>
    <p>Beyond basic conversions, ArrayCat helps you <strong>delete duplicates from lists</strong> and
    <strong>remove duplicates from arrays</strong>. Make your data clean with just a few clicks.</p>

    <h2 class="mt-5">Convert lists to multiple array formats</h2>
    <p>Whether you need to <strong>convert text to array in PHP</strong>, <strong>create JavaScript arrays from text</strong>,
    or generate SQL statements, ArrayCat is a cat who wants to match all your needs.</p>

    <p class="mt-5 small">
      <b>Privacy Policy:</b> Cats mind their own business. Data processing happens only inside
      your browser, no data is sent to anywhere.<br><br>
      <b>Terms of Service:</b> This service is provided to you "as is" without any guarantees of any kind. If you wish
      to use this service, you will do so entirely at your own risk. For any feedback, please send an email: <a
      href="mailto:jouni@arraycat.com">jouni@arraycat.com</a>
    </p>

    <p class="text-center mt-5 small">
      Copyright 2023-<?php echo date('Y'); ?> <a href="https://greatsoftwarecompany.com" target="_blank">Great Software Company</a><br>
      All Rights Reserved<br>
      <a href="https://github.com/Great-Software-Company/array_cat" target="_blank">View on GitHub</a>
    </p>

  </div>
</footer>
<div class="copy-notification"></div>
<script src="./assets/js/cookie.js"></script>
<script src="./assets/js/darkmode.js"></script>
<script src="./assets/js/jquery.min.js"></script>
<script src="./assets/js/bootstrap.js"></script>
<script src="./assets/js/alert.js"></script>
<script src="./assets/js/script.js"></script>
</body>
</html>
