module.exports = {
    success: (res, payload) => {
        const {
          code,
          status,
          message,
          data,
        } = payload
    
        const response = {
          code: code || 200,
          status: status || 'success',
          message,
          data,
        }
    
        res.status(code).json(response)
    
        // PENGGUNAAN
        /*
        success(res, {
          code: 200,
          status: success,
          message: 'create user sucesss',
          data: []
        })
        */
      },
      failed: (res, payload) => {
        const { code, status, message, error } = payload
    
        const response = {
          code: code || 500,
          status: status || 'failed',
          message,
          error,
        }
    
        res.status(code).json(response)
    
        // PENGGUNAAN
        /*
        failed(res, {
          code: 400,
          status: error || failed,
          message: 'bad request',
          error: []
        })
        */
      },
}