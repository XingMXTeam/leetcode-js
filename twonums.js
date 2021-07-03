
function twoSum(nums, target) {
   var result = [];
   var hashMap  = new Map();
   nums.forEach((item, i) => hashMap.set(item, i))
   nums.some((item, i) => {
     const value = hashMap.get(target - item)
     if(typeof value != undefined) {
       result[0] = i
       result[1] = value
       return true
     }
     return false
   })
   return result
}

module.exports = twoSum;