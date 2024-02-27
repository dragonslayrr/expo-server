const LoginInfo = {
    value: {id: -1, email: "Go Log In"},
    listners: [] as any[],
    Set: (value: {id: number, email: string}) => {
        LoginInfo.value = value
        LoginInfo.EmitChange()
    },
    Get: () => {
        return LoginInfo.value
    },
    Subscribe: (listner: any) => {
        LoginInfo.listners = [...LoginInfo.listners, listner]
        return () => {
            LoginInfo.listners = LoginInfo.listners.filter((l) => l !== listner)
        }
    },
    EmitChange: () => {
        for (let listner of LoginInfo.listners) {
            listner()
        }
    },
    Remove: () => {
        LoginInfo.Set({id:-1, email:"Go Log In"})
    }
}

export { LoginInfo }

// nowhowaboutimakealoginthatusesaridicoulouslylongnameandseehowitreacts@iprobablyspelledridicoulouswrong.com pass: adsf