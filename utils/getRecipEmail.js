const getRecipEmail = (users, userLogginIn) => {
    return users?.filter(userToFilter => userToFilter !== userLogginIn?.email)[0]
}

export default getRecipEmail;