const RequestStatus = require("../models/RequestStatus")
const setRequestStatusOption = ( requestBody ) => {
    console.log(requestBody)
    const options = {}
    if(requestBody.senderId){
        options.senderId = requestBody.senderId
    }
    if(requestBody.destinationId){
        options.destinationId = requestBody.destinationId
    }
    if(requestBody.status === "pending" || requestBody.status === "accepted" || requestBody.status === "rejected"){
        options.status = requestBody.status
    }
    return options
}
exports.getAllRequestStatuses = async(req, res, next) => {
    const requestStatuses = await RequestStatus.find().populate("senderId").populate("destinationId");
    if(!requestStatuses){
        return res.sendStatus(404)
    }
    return res.status(200).json({
        requestStatuses
    })
}
exports.getRequestStatusById = async(req, res, next) => {
    const requestStatus = await RequestStatus.findById(req.params.requestStatusId)
    if(!requestStatus){
        return res.sendStatus(404)
    }
    return res.status(200).json({
        requestStatus
    })
}
exports.getRequestStatusByCriterium = async(req, res, next) => {
    const requestOptions = setRequestStatusOption(req.query)
    console.log(requestOptions)
    const requestStatuses = await RequestStatus.find(requestOptions)
    if(!requestStatuses){
        return res.sendStatus(404)
    }
    return res.status(200).json({
        requestStatuses
    })
}
exports.createRequestStatus = async(req, res, next) => {
    const { senderId, destinationId, status } = req.body;
    const newRequestStatus = new RequestStatus({
        senderId,
        destinationId,
        status
    })
    await newRequestStatus.save();
    return res.sendStatus(201)
}

exports.updateRequestStatus = async(req, res, next) => {
    const requestStatusOptions = setRequestStatusOption(req.query)
    const updatedRequestStatus = await RequestStatus.findByIdAndUpdate(req.params.requestStatusId, {...requestStatusOptions})
    if(!updatedRequestStatus){
        return res.sendStatus(404)
    }
    return res.sendStatus(200)
}

exports.deleteRequestStatus = async(req, res, next) => {
    const deletedRequest = await RequestStatus.findByIdAndDelete(req.params.requestStatusId)
    if(!deletedRequest){
        return res.sendStatus(404)
    }
    return res.sendStatus(200)
}