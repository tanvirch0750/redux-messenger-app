const getPartnerInfo = (participants, loggedInUserEmail) => {
  return participants?.find(
    (participant) => participant.email !== loggedInUserEmail
  );
};

export default getPartnerInfo;
