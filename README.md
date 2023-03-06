# user-location-address

<div align='center'>

[![GitHub](https://img.shields.io/github/license/mkyy/mui-search-bar?style=plastic)](https://github.com/GersonRocha9/user-location-address 'View this project on GitHub')
[![npm](https://img.shields.io/npm/v/user-location-address?style=plastic)](https://www.npmjs.com/package/user-location-address 'View this project on npm')

</div>

## Installation

```shell
npm i user-location-address
```

or

```shell
yarn add user-location-address
```

## Usage

This hook returns the `userLocation, latitude, longitude, isLoading, userClickToGetLocation`. This hook also includes the insertion of the user's city, state and country in Local Storage.

```js
import { useUserLocation } from "user-location-address";

return (

  const { userClickToGetLocation, userLocation, isLoading } = useUserLocation();

  // Passing data as properties to a button component.
  <LocationButton
    onClick={userClickToGetLocation}
    userLocation={userLocation}
    isLoading={isLoading}
  />
);
```

### Hook return

| Name                   | Type      | Description                   |
| ---------------------- | --------- | ----------------------------- |
| userLocation           | `object`  | User address return           |
| latitude               | `number`  | User's latitude               |
| longitude              | `number`  | User's longitude              |
| isLoading              | `boolean` | Data loading process          |
| userClickToGetLocation | `func`    | Executes the data return call |

## License

The files included in this repository are licensed under the MIT license.

## Contributions

Feel free to open an issue or add a pull request. Anytime. Really, I mean it.
