export function userGreeting(offset = 1) { 
    const currentHour = new Date().getUTCHours() + offset;
  
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

export function capitaliseString(str: string = "User") {
    return str.charAt(0).toUpperCase() + str.slice(1) 
  }