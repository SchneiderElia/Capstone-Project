import dashboardBlock from "../../database/model/dashboar.Block.js"


export const getDashboard = async (request, response, next) => {
    console.log('Executing getDashboard Handler')

    try{
                const user = request.user
            if (!user) {
                console.error('User object missing from request after authorization middleware.');
                return response.status(401).json({ message: 'Uaser not finde.' });
            }

            const userId = user._id
            const blocks = await dashboardBlock.find({ user: userId }).sort({ order: 1 })
            console.log('Dashboard Blocks:', blocks.length)

            const dashboardData = {
                userInfo: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
                blocks: blocks
            }
            response.status(200).json(dashboardData)

        }catch{
            console.error("Erroe in getDashboard Handler:", error)
            next(error)
        }
    
}
