const Chat = require("../models/chatSchema")
const Users = require("../models/userSchema")



exports.getAllChat = async(req, res)=>{
    const passToken = req.userId
    try {
        const chats = await Chat.find({
            where: {
                userIDs: {
                    hasSome: [passToken]
                }
            }
        })

        return res.status(200).json(chats)
    } catch(error){
        return res.status(500).json({message: "Field to get chats!"})
    }
}


exports.getSingleChat = async(req, res)=>{
    const passToken = re.UserId
    try {

        const chat = await Chat.findById({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [passToken]
                }
            },
            include: {
                messages: {
                    orderBy: {
                        timestamps: "asc"
                    }
                }
            }
        })
        await Chat.findOneAndUpdate({
            where:{
                id:req.params.id
            },
            data:{
                seen_by: {
                    push:[passToken]
                }
            }
        })
        return res.status(200).json(chat)
    } catch(error){
        return res.status(500).json({message: "Field to get this chat!"})
    }
}


exports.addChat = async(req, res)=>{
    const passToken = req.userId
    try {
        
        const newChat = await Chat.create({
           data:{
            userIDs: [passToken, req.body.receiver]
           }
        })

        return res.status(200).json(newChat)
    } catch(error){
        return res.status(500).json({message: "Field to add chat!"})
    }
}


exports.readChat = async(req, res)=>{
    const passToken = req.userId
    try {

        const updatedChat = await Chat.findByIdAndUpdate({
            where:{
                id: req.params.id,
                userIDs:{
                    hasSome: [passToken]
                }
            },
            data: {
                seenBy: {
                    push: [passToken]
                }
            }
        })

        return res.status(200).json(updatedChat)
    } catch(error){
        return res.status(500).json({message: "Field to read chat!"})
    }
}