const Messages = require("../models/messageSchema")
const Users = require("../models/userSchema")
const Chat = require("../models/chatSchema")







exports.addMessage = async(req, res)=>{
    const passToken = req.userId
    const chatId = req.params.chatId
    const text = req.body.text
    try {
    
        const chat = await Chat.findById({
            where:{
                id:chatId,
                userIDs:{
                    hasSome: [passToken],
                }
            }
        })
        if(!chat) return res.status(404).json({message: "Chat not found!"})
        
            const message = await Chat.create({
                data: {
                    text,
                    chatId,
                    userId: passToken,
                }
            })

            await  Chat.findOneAndUpdate({
                where: {
                    id: chatId,
                },
                data: {
                    seen_by: [passToken],
                    last_message: text,
                },
            }) 
        return res.status(200).json(message)
    } catch(error){
        return res.status(500).json({message: "Field to add message!"})
    }
}
