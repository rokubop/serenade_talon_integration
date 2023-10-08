# Talon for Serenade integration

This integration allows you to use "pop" and "hiss" noise from Talon in Serenade, as well as sleep and wake Serenade from Talon.

1. Place `talon_for_serenade` folder inside of your `talon/user` folder (you'll have to find the path, it may be different from system to system. On windows it's in C:/Users/{UserName}/AppData/Roaming/talon, on other OS it might be home/.talon). If you have talon community/knausj installed, you can say "go talon home" from the explorer or finder to jump straight there. Code must go in the "user" folder for it to execute.

2. Try running Talon (it can stay in sleep mode), and try 'pop' or 'hiss' sound, and see if they get logged to talon/parrot.log file which should be created.

3. Update the `talon_commands.talon` and `talon_sleep_commands.talon` files to make sure it is using the correct hotkey to toggle Serenade sleep/wake. You can read about Talon keys mappings here: https://talon.wiki/key_action/

4. Try "serenade wake" and "serenade sleep". You can customize these phrases.

5. Now that the Talon side is finished, let's move on to the Serenade side. Place `talon_parrot_reader.js` in you `~/.serenade/scripts` folder.

5. You must update this line in `talon_parrot_reader.js`. Use the actual path.
```
const file = path.normalize(
  "C:\\Users\\{UserName}\\AppData\\Roaming\\talon\\parrot.log"
);
```

6. from the `.serneade` directory, install the required package `tail-file`
```
npm install tail-file
```

7. Note that you have to say "start parrot", or somehow save a cachedApi in order for the integration to start working.
```
serenade.global().command("start parrot", (api) => {
  console.log("Starting to listen to parrot");
  cachedApi = api;
});
```

Note that the `talon/parrot.log` file will continue to grow so you should probably delete it over time, or add python code to `talon/user/talon_for_serenade/parrot.logger.py` to auto clean it up every now and then.

You can add more commands to the Talon files, such as F1-F12 keys or other keys if you like. Example: `function one: key(f1)`. You can add these commands to the `talon_commands.talon` and `talon_sleep_commands.talon`, or make new `.talon` files, as long as it's inside the user folder.

If you want to disable any of the talon commands or parrot commands, put a `# ` before the line.

Talon comes with two free parrot sounds. "pop" and "hiss". however "hiss" may trigger too aggressively, so it is commented out by default.