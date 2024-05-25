import Client from 'ssh2-sftp-client'
import path from 'path'
import fs from 'fs'

export class SftpUtil {
  sftpClient

  constructor() {
    this.sftpClient = new Client()
  }

  /**
   *
   *
   *  config = {
    host: 'your_sftp_host',
    port: 22, // Default SFTP port is 22
    username: 'your_sftp_username',
    password: 'your_sftp_password', // Alternatively, use privateKey
    // privateKey: fs.readFileSync(path.resolve(__dirname, 'your_private_key.pem')),
  }
   *
   * @param config
   */
  connect = async (config: any) => {
    console.log(`Establishing SFTP connection to server: ${config.host}`)
    try {
      await this.sftpClient.connect(config)
      console.log('Connected to SFTP server')
    } catch (error) {
      console.log(`SFTP connection failed with error: ${error}`)
    }
  }

  disconnect = async () => {
    await this.sftpClient.end()
  }

  downloadFile = async (remoteFilePath: string, localFilePath: string) => {
    try {
      await this.sftpClient.get(remoteFilePath, localFilePath)
      console.log(`File downloaded to ${localFilePath}`)
    } catch (err) {
      console.error('Error downloading file:', err)
    } finally {
      this.sftpClient.end()
      console.log('SFTP connection closed')
    }
  }

  uploadFile = async (localFile: string, remoteFile: string) => {
    console.log(`Uploading ${localFile} to ${remoteFile} ...`)
    try {
      await this.sftpClient.put(localFile, remoteFile)
    } catch (err) {
      console.error('Uploading failed:', err)
    }
  }

  deleteFile = async (remoteFile: string) => {
    console.log(`Deleting ${remoteFile}`)
    try {
      await this.sftpClient.delete(remoteFile)
    } catch (err) {
      console.error('Deleting failed:', err)
    }
  }
}
