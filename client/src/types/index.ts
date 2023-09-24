export type InputProps = {
  type: string;
  name: string;
  title: string;
  onChange: React.ChangeEventHandler;
  id: string;
  placeholder: string;
  value: string;
};
export type SignInFormType = { email: string; password: string };
export type userProfileDataType = {
  firstName: string;
  lastName: string;
  location: {
    coordinates: [];
  };
  cloudinaryProfileImgUrl?: string;
  cloudinaryId?: string;
  activities: {
    networking: boolean;
    mentorship: boolean;
    coffeeMeet: boolean;
    virtualCoffee: boolean;
    chingu: boolean;
    onlineGames: boolean;
    nightlife: boolean;
    virtualMeet: boolean;
    cycling: boolean;
    hiking: boolean;
    iceHockey: boolean;
    running: boolean;
    snowSport: boolean;
    tennis: boolean;
    walking: boolean;
    waterSport: boolean;
    yoga: boolean;
  };
  _id: string;
  dismissedUpdateProfileMessage: boolean;
  photos: [{ cloudinaryImgUrl: string; cloudinaryId: string }];
  __v: number;
  profession?: string;
  confirmedPassword: string;
};
export type SignUpFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmedPassword: string;
};
export type SignUpErrorsType = {
  firstName: { message: string } | undefined;
  lastName: { message: string } | undefined;
  email: boolean;
  password: boolean;
};
