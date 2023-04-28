export default function intHandler(num, type, decimals, plusMinus) {
    // num is a string containing the number
    // type is either "percent" or "dollar", anything else will result in "-"
    // decimals is a number that represents the number of decimals you want
    // plusMinus (true or false) determines whether to use "+" or "-" at the beggining of the return value, based on the orginial number (without decimal cuts) (0 is positive)
    // Set Placeholder Depending Upon Type & Decimals
    let handledInt;
    // Handles Percentage Placeholder
    // eslint-disable-next-line
    if (type == 'percent' || type == 'percentMultiply') {
        handledInt = '0.00%'   
    }
    // Handles Dollar Placeholder
    // eslint-disable-next-line
    else if (type == 'dollar') {
        // eslint-disable-next-line
        if (decimals == 0) {
            handledInt = '$0';
        } else {
            handledInt = '$0.00';
        }
    }
    // Handles Number With Financial Standard Dash
    else {
        handledInt = '-';
    }
    // eslint-disable-next-line
    if (num != null && num != undefined) {
        try {
            // Handles Int Which May Come In As A PreProcessed String From External APIs
            let parsedInt = parseFloat(num.toString().replace(/,/g, ''));
            // eslint-disable-next-line
            if (type == 'percentMultiply') {
                parsedInt = parsedInt * 100;
            }
            // eslint-disable-next-line
            if (decimals != -1) {
                parsedInt = parseFloat(parsedInt.toFixed(decimals));
            }
            // Processes The Input To Ensure It Is Valid. If Not Returns Placeholder Values Above
            // eslint-disable-next-line
            if (typeof parsedInt ==  'number' && !isNaN(parsedInt)) {
                // Handles Edge Case For Divide By Zero Elsewhere By Checking For Infinity To Avoid Error
                if (isFinite(parsedInt)) {
                    // Checks Number of Decimals Requested And Expands/Trims Float To This Amount.
                    // Handles If Number Is Greater Than 999 By Inserting Comma. Similarly Handles 999,999 and 999,999,999.
                    // Keep parsedInt for plusMinus check later
                    let absInt = (parsedInt < 0 ? -parsedInt : parsedInt);
                    // eslint-disable-next-line
                    if (decimals != -1) {
                        // Adjusts Return Value to Required Number of Decimals
                        absInt = absInt.toFixed(decimals);
                    }
                    if (absInt > 999) {
                        // Adjusts Return Value to String And Adds Commas
                        absInt = absInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    // Now That Value Is String With Appropriate Commas Use Type To Determine String Additions
                    // For Type Percent, Add a % at the end of the string
                    // eslint-disable-next-line
                    if (type == 'percent' || type == 'percentMultiply') {
                        handledInt = absInt + "%";
                    }
                    // For Type Dollar, Add a $ at the beginning of the string
                    // eslint-disable-next-line
                    else if (type == 'dollar') {
                        handledInt = "$" + absInt;
                    }
                    // For Other Type - Do Nothing
                    else {
                        handledInt = absInt;
                    }
                    // Handles Showing Plus (+) or Minus(-) at the beginning if value is true with + or - at beginning of handledInt
                    if (plusMinus) {
                        if(num < 0){
                            handledInt = "-" + handledInt;
                        } else if (num > 0) {
                            handledInt = "+" + handledInt;
                        }
                    }
                }
            }
            return handledInt;
        } catch {
            return handledInt;
        }
    }
  };
  