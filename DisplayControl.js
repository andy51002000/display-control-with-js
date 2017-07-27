const os = require("os");

const path = require("path");



function displayControl(state) {

	const platform = os.platform();

	switch (platform) {

		case "win32": {

			if (state === "off"){

				turnOff();

			}
			else
			{
				turnOn();

			}

			break;

		}

		

		default: {

			throw Error("Platform " + platform + " is not supported yet. Pull requests are welcome.");
		

		}

	}

}




function turnOff() {

	// Credits: http://www.powershellmagazine.com/2013/07/18/pstip-how-to-switch-off-display-with-powershell/

	//

	//     Turn display off by calling WindowsAPI.

	//

	//     SendMessage(HWND_BROADCAST,WM_SYSCOMMAND, SC_MONITORPOWER, POWER_OFF)

	//     HWND_BROADCAST  0xffff

	//     WM_SYSCOMMAND   0x0112

	//     SC_MONITORPOWER 0xf170

	//     POWER_OFF       0x0002



	const ffi = require("ffi");



	const user32 = ffi.Library("user32", {

		SendMessageW: ["int", ["ulong", "uint", "long", "long"]]



	});



	const HWND_BROADCAST = 0xffff;

	const WM_SYSCOMMAND = 0x0112;

	const SC_MONITORPOWER = 0xf170;

	const POWER_OFF = 0x0002;



	user32.SendMessageW(HWND_BROADCAST, WM_SYSCOMMAND, SC_MONITORPOWER, POWER_OFF);

}

function turnOn() {


	const ffi = require("ffi");



	const user32 = ffi.Library("user32", {

		SendMessageW: ["int", ["ulong", "uint", "long", "long"]],
		mouse_event: ['void', ['int', 'int', 'int', 'int', 'int']]
	});



	const HWND_BROADCAST = 0xffff;

	const WM_SYSCOMMAND = 0x0112;

	const SC_MONITORPOWER = 0xf170;

	const POWER_OFF = -1;



	//user32.SendMessageW(HWND_BROADCAST, WM_SYSCOMMAND, SC_MONITORPOWER, POWER_OFF);
	user32.mouse_event(4, 0 ,0 ,0 ,0);

}

module.exports = displayControl;