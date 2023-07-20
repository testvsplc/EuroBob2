# EuroBob React Native App

A mobile application built using React Native

## Installation
1. Clone
    ``` bash
    $ git clone git@gitlab.com:Codebridge/EurobobApp.git
    ```
1. Install dependecies
    ``` bash
    $ npm install
    ```
1. Install Node(if not yet installed) and Watchman with `brew`
    ``` bash
    $ brew install node
    ```
    ``` bash
    $ brew install watchman
    ```

 Before the installation please read the '[Getting Started](https://facebook.github.io/react-native/docs/getting-started.html)' guide(build project with native code)
 
## OSX

1. Install Xcode. [Readmore](https://facebook.github.io/react-native/docs/getting-started)

## Android

1. [Android Studio](https://developer.android.com/studio/)
1. [NDK](https://developer.android.com/ndk/guides/)


## Development
1. Install react native CLI global
    ``` bash
    $ npm install -g react-native-cli
    ```
1. Link native dependecies
    ``` bash
    react-native link
    ```
1. Run the react-native simulator
    ```    
    react-native run-ios
    react-native run-ios --simulator 'iPhone 8'
    react-native run-android
    ```

## Debug

1. Use the react-native devtool when debugging the elements/views
    ```
    npm run react-devtool
    ```
1. Install `React Native Debugger` to debug redux
    ``` bash
    brew update && brew cask install react-native-debugger
    ```
    ``` bash
    open "rndebugger://set-debugger-loc?host=localhost&port=8081"    
    ```
1. Trigger chat notification:
    ``` javascript
    const message = {
        "_id": "abc",
        "msg": "This is a test message",
        "ts": "2019-01-16T12:45:54.342Z",
        "u": {
            "_id": "a",
            "username": "info.codebridge",
            "name": "Info Codebridge"
        }
    }

    dispatch(receivedMessage(message));
    dispatch(toggleChatNotification(true));
    ```
    Comment out `closeNotification` in `componentDidMount` method (`src/modules/chat/components/ChatNotification.js`)

1. Use npm run clean to clean Android caches
    ```
    npm run clean
    ```
1. Acces errors from phone [read more] (https://developer.android.com/studio/command-line/logcat)
    ```bash
    adb logcat *:W
    ```


## Deploy

### Deploy IOS app
1. Open Xcode and increase build number
1. Choose `Generic IOS device` in the top device selector
1. Click on `Product` > `Archive`
1. After build click on `Distribute App`
1. Choose `IOS App Store` and click on `next`
1. Choose `Upload` and click on `next`
1. Go to [itunesconnect](`https://itunesconnect.apple.com`)

### Deploy Android app
1. Change versionName and versionCode in `android/build.gradle`
1. Generate `APK`
    ```bash
    $ cd android
    $ ./gradlew bundleRelease
    ```
1. Sign in to the [google Play store](https://play.google.com/apps/publish/signup/)
1. Click on the `EuroBob` application and go to the `Release management` > `App releases`
1. Click on `edit release`
1. Add the Android APK by clicking on `browse files` and select the file `android/app/build/outputs/bundle/release/app.aab`
1. Fill the `What's new in this release?` text
1. Click on `save`
1. Click on `review`
1. Click on `start roll-out to production`

### Test android bundle (.aab)
1. Install bundletool; `brew install bundletool`
1. Run `bundletool build-apks --bundle=./android/app/build/outputs/bundle/release/app.aab --output=./android/app/build/outputs/apk/release/app.apks`
1. Connect android phone
1. Run `bundletool install-apks --apks=./android/app/build/outputs/apk/release/app.apks`

**Important:** Do not forget to push code changes and do a code review before releasing the app
