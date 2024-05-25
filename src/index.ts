import Client from 'ssh2-sftp-client'
import path from 'path'
import fs from 'fs'

const downloadFile = async () => {
  const sftp = new Client()
  const sftpConfig = {
    host: 'your_sftp_host',
    port: 22, // Default SFTP port is 22
    username: 'your_sftp_username',
    password: 'your_sftp_password', // Alternatively, use privateKey
    // privateKey: fs.readFileSync(path.resolve(__dirname, 'your_private_key.pem')),
  }

  const remoteFilePath = '/remote/path/to/file.txt'
  const localFilePath = path.resolve('downloaded_file.txt')

  try {
    await sftp.connect(sftpConfig)
    console.log('Connected to SFTP server')

    await sftp.get(remoteFilePath, localFilePath)
    console.log(`File downloaded to ${localFilePath}`)
  } catch (err) {
    console.error('Error downloading file:', err)
  } finally {
    sftp.end()
    console.log('SFTP connection closed')
  }
}

downloadFile()
