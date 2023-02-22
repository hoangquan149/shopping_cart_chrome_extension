import { useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'

function ModalInfo(props) {
  const { open, handleOpenModalInfo, children } = props

  return (
    <Modal
      title="Thông tin sản phẩm"
      open={open}
      width={700}
      footer={null}
      onCancel={handleOpenModalInfo}
    >
        {children}
    </Modal>
  )
}

export default ModalInfo